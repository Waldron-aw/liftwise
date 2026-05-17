import secrets
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models.user import User, UserRole
from models.invite import InviteCode
from services.firebase_auth import verify_firebase_token
from services.current_user import require_admin

router = APIRouter()


class RegisterRequest(BaseModel):
    invite_code: str
    display_name: str | None = None


class CreateInviteRequest(BaseModel):
    uses: int = 1  # -1 for unlimited
    expires_days: int | None = None


@router.post("/register")
def register(
    body: RegisterRequest,
    token_data: dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db),
):
    # Check not already registered
    existing = db.query(User).filter(User.firebase_uid == token_data["uid"]).first()
    if existing:
        return {"user_id": str(existing.id), "role": existing.role.value}

    # Validate invite code
    invite = db.query(InviteCode).filter(InviteCode.code == body.invite_code).first()
    if not invite:
        raise HTTPException(status_code=400, detail="Invalid invite code")
    if invite.uses_remaining == 0:
        raise HTTPException(status_code=400, detail="Invite code already used")
    if invite.expires_at and invite.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Invite code expired")

    # Create user
    user = User(
        firebase_uid=token_data["uid"],
        email=token_data.get("email", ""),
        display_name=body.display_name or token_data.get("name"),
    )
    db.add(user)

    # Decrement invite uses
    if invite.uses_remaining > 0:
        invite.uses_remaining -= 1

    db.commit()
    db.refresh(user)
    return {"user_id": str(user.id), "role": user.role.value}


@router.post("/invites", dependencies=[Depends(require_admin)])
def create_invite(body: CreateInviteRequest, db: Session = Depends(get_db), admin=Depends(require_admin)):
    from datetime import timedelta

    expires_at = None
    if body.expires_days:
        expires_at = datetime.now(timezone.utc) + timedelta(days=body.expires_days)

    invite = InviteCode(
        code=secrets.token_urlsafe(8),
        created_by=admin.id,
        uses_remaining=body.uses,
        expires_at=expires_at,
    )
    db.add(invite)
    db.commit()
    return {"code": invite.code, "uses_remaining": invite.uses_remaining, "expires_at": invite.expires_at}


@router.get("/invites", dependencies=[Depends(require_admin)])
def list_invites(db: Session = Depends(get_db)):
    invites = db.query(InviteCode).order_by(InviteCode.created_at.desc()).all()
    return [
        {"code": i.code, "uses_remaining": i.uses_remaining, "expires_at": i.expires_at, "created_at": i.created_at}
        for i in invites
    ]

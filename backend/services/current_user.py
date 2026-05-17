from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user import User
from services.firebase_auth import verify_firebase_token


def get_current_user(
    token_data: dict = Depends(verify_firebase_token),
    db: Session = Depends(get_db),
) -> User:
    user = db.query(User).filter(User.firebase_uid == token_data["uid"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not registered")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account disabled")
    return user


def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role.value != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return current_user

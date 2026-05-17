import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from config import settings

_app = None


def get_firebase_app():
    global _app
    if _app is None:
        if settings.environment == "development":
            # In dev, skip Firebase and use a mock uid from the token
            return None
        cred = credentials.ApplicationDefault()
        _app = firebase_admin.initialize_app(cred, {"projectId": settings.firebase_project_id})
    return _app


bearer_scheme = HTTPBearer()


def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Security(bearer_scheme)) -> dict:
    token = credentials.credentials

    if settings.environment == "development" and token.startswith("dev-"):
        # dev tokens: "dev-<uid>" for easy local testing
        return {"uid": token[4:], "email": f"{token[4:]}@dev.local"}

    try:
        get_firebase_app()
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

"""Account Role model class.

Manages the account role
"""
from __future__ import annotations

from sqlalchemy import Column, ForeignKey

from .base_model import BaseModel
from .db import db


class AccountRole(BaseModel):
    """Definition of the Account Role entity."""

    __tablename__ = 'account_role'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_user_id = Column(db.Integer, ForeignKey('account_user.id'), nullable=False)
    role_id = Column(db.Integer, ForeignKey('role.id'), nullable=False)

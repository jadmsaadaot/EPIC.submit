"""Account Role model class.

Manages the account role
"""
from __future__ import annotations

from sqlalchemy import Column, ForeignKey

from .base_model import BaseModel
from .db import db


class AccountRole(BaseModel):
    """Definition of the Account Role entity."""

    __tablename__ = 'account_roles'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_user_id = Column(db.Integer, ForeignKey('account_users.id'), nullable=False)
    role_id = Column(db.Integer, ForeignKey('roles.id'), nullable=False)

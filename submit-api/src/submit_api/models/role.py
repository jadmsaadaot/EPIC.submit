"""Role model class.

Manages the role
"""
from __future__ import annotations

from sqlalchemy import Column

from .base_model import BaseModel
from .db import db


class RoleEnum:
    ACCOUNT_PRIMARY_ADMIN = 'ACCOUNT_PRIMARY_ADMIN'


class Role(BaseModel):
    """Definition of the Role entity."""

    __tablename__ = 'roles'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = Column(db.String(50), nullable=False)
    description = Column(db.Text(), nullable=False)

    @classmethod
    def get_by_name(cls, role_name) -> Role:
        """Fetch role by role name."""
        return cls.query.filter_by(role_name=role_name).first()
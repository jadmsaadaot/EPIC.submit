"""Role model class.

Manages the role
"""
from __future__ import annotations

from sqlalchemy import Column

from .base_model import BaseModel
from .db import db


class Role(BaseModel):
    """Definition of the Role entity."""

    __tablename__ = 'role'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = Column(db.String(50), nullable=False)

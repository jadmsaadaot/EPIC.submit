"""Project Team model class.

Manages the project team
"""
from __future__ import annotations

from sqlalchemy import Column, ForeignKey

from .base_model import BaseModel
from .db import db


class ProjectTeam(BaseModel):
    """Definition of the Project Team entity."""

    __tablename__ = 'project_team'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_user_id = Column(db.Integer, ForeignKey('account_user.id'), nullable=False)
    project_id = Column(db.Integer, nullable=False)
    role_id = Column(db.Integer, ForeignKey('role.id'), nullable=False)

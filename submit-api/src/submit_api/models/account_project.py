"""Account Project model class.

Manages the account project
"""
from __future__ import annotations

from sqlalchemy import Column, ForeignKey

from .base_model import BaseModel
from .db import db


class AccountProject(BaseModel):
    """Definition of the Account Project entity."""

    __tablename__ = 'account_projects'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = Column(db.Integer, ForeignKey('accounts.id'), nullable=False)
    project_id = Column(db.Integer, nullable=False)

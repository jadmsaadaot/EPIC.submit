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
    name = Column(db.String(), nullable=False)

    @classmethod
    def add_projects_bulk(cls, projects):
        """Add projects in bulk."""
        db.session.bulk_insert_mappings(cls, projects)
        db.session.commit()
        return projects

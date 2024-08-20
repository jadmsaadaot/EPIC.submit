"""Account Project model class.

Manages the account project
"""
from __future__ import annotations

from sqlalchemy import Column

from .base_model import BaseModel
from .db import db


class Project(BaseModel):
    """Definition of the Project entity."""

    __tablename__ = 'projects'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    name = Column(db.String(), nullable=False)
    proponent_id = Column(db.String(), nullable=False, unique=True)
    proponent_name = Column(db.String(), nullable=False)

    @classmethod
    def get_all_projects_in_ids(cls, project_ids):
        """Get all projects in the given project ids."""
        return cls.query.filter(cls.id.in_(project_ids)).all()

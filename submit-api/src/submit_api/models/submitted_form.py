"""Submitted form model class.

Manages the submitted form
"""
from __future__ import annotations

from sqlalchemy import Column

from .base_model import BaseModel
from .db import db


class SubmittedForm(BaseModel):
    """Definition of the submission form entity."""

    __tablename__ = 'submitted_forms'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    submission_json = Column(db.JSON, nullable=False)
    form_id = Column(db.Integer, nullable=True)

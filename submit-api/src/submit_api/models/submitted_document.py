"""Document form model class.

Manages the document
"""
from __future__ import annotations

from sqlalchemy import Column

from .base_model import BaseModel
from .db import db


class SubmittedDocument(BaseModel):
    """Definition of the submitted documents entity."""

    __tablename__ = 'submitted_documents'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    name = Column(db.String(255), nullable=False)
    url = Column(db.String(), nullable=False)
    folder = Column(db.String(), nullable=True)

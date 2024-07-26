"""Account model class.

Manages the account
"""
from __future__ import annotations

from sqlalchemy import Column

from .base_model import BaseModel
from .db import db


class Account(BaseModel):
    """Definition of the Account entity."""

    __tablename__ = 'account'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    proponent_id = Column(db.String())

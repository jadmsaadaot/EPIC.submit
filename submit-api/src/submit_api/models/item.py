"""Submission item model class.

Manages the item
"""
from __future__ import annotations

from enum import Enum

from sqlalchemy import Column, ForeignKey

from .base_model import BaseModel
from .db import db


class ItemStatus(Enum):
    """Enum for item statuses."""
    PENDING = 'pending'
    COMPLETED = 'completed'


class Item(BaseModel):
    """Definition of the item entity."""

    __tablename__ = 'items'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    package_id = Column(db.Integer, ForeignKey('packages.id'), nullable=False)
    type_id = Column(db.Integer, ForeignKey('item_types.id'), nullable=False)
    type = db.relationship('ItemType', foreign_keys=[type_id], lazy='joined')
    status = Column(db.Enum(ItemStatus), nullable=False, default=ItemStatus.PENDING)
    version = Column(db.Integer, nullable=False)
    submitted_on = Column(db.DateTime, nullable=False)
    submitted_by = Column(db.String(255), nullable=False)

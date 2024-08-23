"""Submission item model class.

Manages the item
"""
from __future__ import annotations

import enum

from sqlalchemy import Column, Enum, ForeignKey

from .base_model import BaseModel
from .db import db


class ItemStatus(enum.Enum):
    """Enum for item statuses."""

    PENDING = 'PENDING'
    COMPLETED = 'COMPLETED'


class Item(BaseModel):
    """Definition of the item entity."""

    __tablename__ = 'items'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    package_id = Column(db.Integer, ForeignKey('packages.id'), nullable=False)
    type_id = Column(db.Integer, ForeignKey('item_types.id'), nullable=False)
    type = db.relationship('ItemType', foreign_keys=[type_id], lazy='joined')
    status = Column(Enum(ItemStatus), nullable=False, default=ItemStatus.PENDING)
    version = Column(db.Integer, nullable=False)
    submitted_on = Column(db.DateTime, nullable=True)
    submitted_by = Column(db.String(255), nullable=True)

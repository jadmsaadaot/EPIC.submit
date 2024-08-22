"""Submission package item types model class.

Manages the package item types
"""
from __future__ import annotations

from sqlalchemy import Column, ForeignKey, PrimaryKeyConstraint

from .base_model import BaseModel
from .db import db


class PackageItemType(BaseModel):
    """Definition of the package item type entity."""

    __tablename__ = 'package_item_types'

    package_type_id = Column(db.Integer, ForeignKey('package_types.id'), nullable=False)
    item_type_id = Column(db.Integer, ForeignKey('item_types.id'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('package_type_id', 'item_type_id'),
    )

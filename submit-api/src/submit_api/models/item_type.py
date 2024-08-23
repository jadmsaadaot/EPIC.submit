"""Item types type model class.

Manages the item types
"""
from __future__ import annotations

from sqlalchemy import Column
from sqlalchemy.orm import relationship

from .base_model import BaseModel
from .db import db


class ItemType(BaseModel):
    """Definition of the item type entity."""

    __tablename__ = 'item_types'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    name = Column(db.String(255), nullable=False)
    package_types = relationship('PackageType', secondary='package_item_types', back_populates='item_types')

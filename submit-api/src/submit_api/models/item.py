"""Submission item model class.

Manages the item
"""
from __future__ import annotations

import enum

from sqlalchemy import Column, Enum, ForeignKey, orm, desc, select, and_, func
from sqlalchemy.ext.hybrid import hybrid_property

from .submission import Submission
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
    submitted_on = Column(db.DateTime, nullable=True)
    submitted_by = Column(db.String(255), nullable=True)

    @property
    def submissions(self):
        """Get the latest submission for each type."""
        subquery = (
            select(
                Submission.item_id,
                Submission.type,
                func.max(Submission.version).label('latest_version')
            )
            .group_by(Submission.item_id, Submission.type)
            .alias()
        )

        # get the latest submission for each type
        latest_submissions = (
            select(Submission.id)
            .where(
                and_(
                    Submission.item_id == self.id,
                    Submission.type == subquery.c.type,
                    Submission.version == subquery.c.latest_version
                )
            )
            .alias()
        )
        return db.session.query(Submission).filter(Submission.id.in_(latest_submissions)).all()

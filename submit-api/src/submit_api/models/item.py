"""Submission item model class.

Manages the item
"""
from __future__ import annotations

import enum

from sqlalchemy import Column, Enum, ForeignKey, select, and_, func

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
    version = Column(db.Integer, nullable=False, default=1)

    @property
    def submissions(self):
        """Get the latest submission for each type."""
        # Step 1: Define a subquery to get the latest version of each submission for each type
        latest_versions_subquery = (
            select(
                Submission.item_id,
                Submission.type,
                func.max(Submission.version).label('latest_version')
            )
            .group_by(Submission.item_id, Submission.type)
            .subquery()
        )

        # Step 2: Define the main query to get the latest submissions based on the latest versions
        latest_submissions_query = (
            select(Submission)
            .join(latest_versions_subquery, and_(
                Submission.item_id == latest_versions_subquery.c.item_id,
                Submission.type == latest_versions_subquery.c.type,
                Submission.version == latest_versions_subquery.c.latest_version
            ))
            .filter(Submission.item_id == self.id)
        )

        # Execute the query and return the results
        return db.session.execute(latest_submissions_query).scalars().all()

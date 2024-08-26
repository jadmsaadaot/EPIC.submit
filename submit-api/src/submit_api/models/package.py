"""Submission package model class.

Manages the package
"""
from __future__ import annotations

import enum

from sqlalchemy import Column, Enum, ForeignKey

from .base_model import BaseModel
from .db import db


class PackageStatus(enum.Enum):
    """Enum for package statuses."""

    IN_REVIEW = 'IN_REVIEW'
    APPROVED = 'APPROVED'
    REJECTED = 'REJECTED'


class Package(BaseModel):
    """Definition of the package entity."""

    __tablename__ = 'packages'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_project_id = Column(db.Integer, ForeignKey('account_projects.id'), nullable=False)
    name = Column(db.String(255), nullable=False)
    type_id = Column(db.Integer, ForeignKey('package_types.id'), nullable=False)
    type = db.relationship('PackageType', foreign_keys=[type_id], lazy='joined')
    status = Column(Enum(PackageStatus), nullable=False, default=PackageStatus.IN_REVIEW)
    submitted_on = Column(db.DateTime, nullable=True)
    submitted_by = Column(db.String(255), nullable=True)

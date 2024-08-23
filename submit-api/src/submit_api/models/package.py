"""Submission package model class.

Manages the package
"""
from __future__ import annotations

from enum import Enum

from sqlalchemy import Column, ForeignKey

from .base_model import BaseModel
from .db import db


class PackageStatus(Enum):
    """Enum for package statuses."""

    IN_REVIEW = 'in_review'
    APPROVED = 'approved'
    REJECTED = 'rejected'


class Package(BaseModel):
    """Definition of the package entity."""

    __tablename__ = 'packages'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_project_id = Column(db.Integer, ForeignKey('account_projects.id'), nullable=False)
    account_project = db.relationship('AccountProject', foreign_keys=[account_project_id], lazy='select')
    name = Column(db.String(255), nullable=False)
    type_id = Column(db.Integer, ForeignKey('package_types.id'), nullable=False)
    type = db.relationship('PackageType', foreign_keys=[type_id], lazy='joined')
    status = Column(db.Enum(PackageStatus), nullable=False, default=PackageStatus.IN_REVIEW)
    submitted_on = Column(db.DateTime, nullable=False)
    submitted_by = Column(db.String(255), nullable=False)

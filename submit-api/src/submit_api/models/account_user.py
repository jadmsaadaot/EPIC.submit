"""Account User model class.

Manages the account user
"""
from __future__ import annotations

from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import column_property

from .base_model import BaseModel
from .db import db


class AccountUser(BaseModel):
    """Definition of the Account User entity."""

    __tablename__ = 'account_users'

    id = Column(db.Integer, primary_key=True, autoincrement=True)
    account_id = Column(db.Integer, ForeignKey('accounts.id'), nullable=False)
    first_name = Column(db.String(50), nullable=False)
    last_name = Column(db.String(50), nullable=False)
    full_name = column_property(first_name + ' ' + last_name)
    position = Column(db.String(100), nullable=False)
    work_email_address = Column(db.String(100), nullable=False)
    work_contact_number = Column(db.String(50), nullable=False)

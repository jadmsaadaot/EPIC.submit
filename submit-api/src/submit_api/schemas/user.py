"""Engagement model class.

Manages the engagement
"""

from marshmallow import EXCLUDE, Schema, fields

from submit_api.schemas.account import AccountSchema


class UserSchema(Schema):
    """User schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    first_name = fields.Str(data_key="first_name")
    last_name = fields.Str(data_key="last_name")
    work_email_address = fields.Str(data_key="email_address")
    work_contact_number = fields.Str(data_key="contact_number")
    account_id = fields.Int(data_key="account_id")
    account = fields.Nested(AccountSchema, data_key="account", dump_only=True)

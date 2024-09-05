"""Item schema class.

Manages the item schema
"""

from marshmallow import EXCLUDE, Schema, fields


class ItemTypeSchema(Schema):
    """item type schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    name = fields.Str(data_key="name")

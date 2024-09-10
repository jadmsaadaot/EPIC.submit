"""Item schema class.

Manages the item schema
"""

from marshmallow import EXCLUDE, Schema, fields

from submit_api.models.item import ItemStatus
from submit_api.models.submission import SubmissionTypeStatus
from submit_api.schemas.item_type import ItemTypeSchema


class ItemSubmissionSchema(Schema):
    """submission schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    item_id = fields.Int(data_key="item_id")
    type = fields.Enum(data_key="type", enum=SubmissionTypeStatus)
    version = fields.Int(data_key="version")


class ItemSchema(Schema):
    """item schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    package_id = fields.Int(data_key="package_id")
    type_id = fields.Int(data_key="type_id")
    type = fields.Nested(ItemTypeSchema, data_key="type")
    status = fields.Enum(data_key="status", enum=ItemStatus)
    version = fields.Int(data_key="version")
    submitted_on = fields.DateTime(data_key="submitted_on")
    submitted_by = fields.Str(data_key="submitted_by")
    submissions = fields.Nested(ItemSubmissionSchema, data_key="submissions", many=True)

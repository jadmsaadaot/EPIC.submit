"""Package model class.

Manages the package
"""

from marshmallow import EXCLUDE, Schema, fields

from submit_api.models.package import PackageStatus
from submit_api.schemas.account_user import AccountUserSchema
from submit_api.schemas.item import ItemSchema
from submit_api.schemas.package_type import PackageTypeSchema


class PostPackageRequestSchema(Schema):
    """package schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    name = fields.Str(data_key="name")
    metadata = fields.Dict(data_key="metadata")
    type = fields.Str(data_key="type")


class PostPackageState(Schema):
    """package schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    status = fields.Str(data_key="status")


class PackageMetadataSchema(Schema):
    """package schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    package_id = fields.Int(data_key="package_id")
    package_meta = fields.Dict(data_key="package_meta")


class PackageSchema(Schema):
    """package schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    account_project_id = fields.Int(data_key="account_project_id")
    name = fields.Str(data_key="name")
    type = fields.Nested(PackageTypeSchema, data_key="type")
    type_id = fields.Int(data_key="type_id")
    status = fields.Enum(data_key="status", enum=PackageStatus)
    submitted_on = fields.DateTime(data_key="submitted_on")
    submitted_by_account_user = fields.Pluck(AccountUserSchema, "full_name", data_key="submitted_by")
    meta = fields.Nested(PackageMetadataSchema, data_key="meta", many=True)
    items = fields.Nested(ItemSchema, data_key="items", many=True)

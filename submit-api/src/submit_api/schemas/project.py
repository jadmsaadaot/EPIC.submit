"""Engagement model class.

Manages the engagement
"""

from marshmallow import EXCLUDE, Schema, fields


class ProjectSchema(Schema):
    """project schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int(data_key="id")
    name = fields.Str(data_key="name")
    proponent_id = fields.Int(data_key="proponent_id")
    proponent_name = fields.Str(data_key="proponent_name")


class AddProjectSchema(Schema):
    """add project schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    project_ids = fields.List(fields.Int(), data_key="project_ids")


class AccountProjectSchema(Schema):
    """Account project schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    account_id = fields.Int(data_key="account_id")
    project_id = fields.Int(data_key="project_id")
    project = fields.Nested(ProjectSchema, data_key="project")

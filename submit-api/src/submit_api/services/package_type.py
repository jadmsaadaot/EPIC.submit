"""Service for package management."""
from submit_api.models import Package as PackageModel
from submit_api.utils.constants import SUBMISSION_PACKAGE_TYPE_EMAIL_SENDER_MAP


# Set up logging configuration


class PackageTypeService:
    """Package Type management service."""

    @staticmethod
    def get_email_sender_for_package_type(package_type: str) -> str:
        return SUBMISSION_PACKAGE_TYPE_EMAIL_SENDER_MAP.get(package_type, None)

"""Service for package management."""
from collections import defaultdict
from datetime import datetime

from submit_api.exceptions import BadRequestError
# Set up logging configuration

from submit_api.models import Item as ItemModel
from submit_api.models import Package as PackageModel
from submit_api.models import PackageType as PackageTypeModel
from submit_api.models.db import session_scope
from submit_api.models.item import ItemStatus
from submit_api.models.package import PackageStatus
from submit_api.models.package_metadata import PackageMetadata as PackageMetadataModel
from submit_api.models.package_item_type import PackageItemType as PackageItemTypeModel
from submit_api.utils.token_info import TokenInfo


class PackageService:
    """Package management service."""

    @classmethod
    def get_package_by_id(cls, package_id):
        """Get package by id."""
        package = PackageModel.get_package_by_id_with_items(package_id)
        return package

    @classmethod
    def create_package(cls, account_project_id, request_data):
        """Create a new package."""
        with session_scope() as session:
            package_type = PackageTypeModel.find_by_name(
                request_data.get("type"))
            package = cls._create_package(
                session, account_project_id, request_data, package_type)
            cls._create_package_metadata(
                session, package.id, request_data.get("metadata"))
            cls._create_items(session, package.id, package_type.id, package_type.item_types)
            session.commit()
        return PackageModel.find_by_id(package.id)

    @staticmethod
    def _create_package(session, account_project_id, request_data, package_type):
        """Create a new package."""
        package_data = {
            "account_project_id": account_project_id,
            "name": request_data.get("name"),
            "type_id": package_type.id,
        }
        package = PackageModel(**package_data)
        session.add(package)
        session.flush()
        return package

    @staticmethod
    def _create_package_metadata(session, package_id, metadata):
        """Create package metadata."""
        package_metadata = PackageMetadataModel(
            package_id=package_id, package_meta=metadata
        )
        session.add(package_metadata)

    @staticmethod
    def _create_items(session, package_id, package_type_id, item_types):
        """Create items for the package."""
        package_item_types = session.query(PackageItemTypeModel).filter_by(
            package_type_id=package_type_id,
        ).all()

        item_type_to_package_item_type = {
            pit.item_type_id: pit for pit in package_item_types
        }

        for item_type in item_types:
            package_item_type = item_type_to_package_item_type.get(item_type.id)
            if package_item_type:
                item = ItemModel(
                    package_id=package_id,
                    type_id=item_type.id,
                    sort_order=package_item_type.sort_order
                )
                session.add(item)

        session.flush()

    @staticmethod
    def _get_and_validate_complete_package(package_id) -> PackageModel:
        """Retrieve and validate that all items in the package are completed."""
        package = PackageModel.find_by_id(package_id)
        if any(item.status.value != ItemStatus.COMPLETED.value for item in package.items):
            raise BadRequestError("All items must be completed before completing the package")
        return package

    @staticmethod
    def _update_items_status(items, status, session):
        """Update status of all items in the package."""
        for item in items:
            item.status = status
            session.add(item)

    @staticmethod
    def _update_package_submission_details(package, session):
        """Update package submission details."""
        package.submitted_on = datetime.utcnow()
        package.submitted_by = TokenInfo.get_id()
        package.status = PackageStatus.SUBMITTED
        session.add(package)

    @classmethod
    def submit_package(cls, package_id):
        """Submit the package by updating its status and items."""
        package = cls._get_and_validate_complete_package(package_id)

        with session_scope() as session:
            cls._update_package_submission_details(package, session)
            cls._update_items_status(package.items, ItemStatus.SUBMITTED, session)
            session.flush()
            session.commit()
        return package

    @staticmethod
    def _unsupported_status(*args, **kwargs):
        """Handle unsupported status."""
        raise BadRequestError("Status is not supported.")

    @classmethod
    def _get_state_updater(cls, status) -> callable:
        """Retrieve the appropriate state updater function based on status."""
        state_updaters = defaultdict(
            lambda: cls._unsupported_status,
            {
                PackageStatus.SUBMITTED.value: cls.submit_package,
            }
        )
        return state_updaters[status]

    @classmethod
    def update_package_state(cls, package_id, request_data):
        """Update the state of the package based on the provided status."""
        status = request_data.get("status")
        state_updater = cls._get_state_updater(status)
        return state_updater(package_id)

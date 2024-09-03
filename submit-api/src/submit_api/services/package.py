"""Service for package management."""
from submit_api.models import Item as ItemModel
from submit_api.models import Package as PackageModel
from submit_api.models import PackageType as PackageTypeModel
from submit_api.models.db import session_scope
from submit_api.models.package_metadata import PackageMetadata as PackageMetadataModel


class PackageService:
    """Package management service."""

    @classmethod
    def get_package_by_id(cls, package_id):
        """Get project by id."""
        db_project = PackageModel.find_by_id(package_id)
        return db_project

    @classmethod
    def create_package(cls, account_project_id, request_data):
        """Create a new package."""
        with session_scope() as session:
            package_type = PackageTypeModel.find_by_name(request_data.get("type"))
            package_data = {
                "account_project_id": account_project_id,
                "name": request_data.get("name"),
                "type_id": package_type.id,
            }
            package = PackageModel(
                **package_data
            )
            session.add(package)

            package_metadata = PackageMetadataModel(
                package_id=package.id,
                package_meta=request_data.get("metadata")
            )
            session.add(package_metadata)

            for item_type in package_type.item_types:
                item = ItemModel(
                    package_id=package.id,
                    type_id=item_type.id,
                )
                session.add(item)
            session.flush()
            session.commit()
        return PackageModel.find_by_id(package.id)

"""Service for project management."""

from submit_api.models.account_project import AccountProject as AccountProjectModel
from submit_api.models.project import Project as ProjectModel
from submit_api.models.queries.project import ProjectQueries


class ProjectService:
    """Project management service."""

    @classmethod
    def get_project_by_id(cls, project_id):
        """Get project by id."""
        db_project = AccountProjectModel.find_by_id(project_id)
        return db_project

    @classmethod
    def get_projects_by_account_id(cls, account_id):
        """Get projects by account id."""
        return ProjectQueries.get_projects_by_account_id(account_id)

    @classmethod
    def get_projects_by_proponent_id(cls, proponent_id):
        """Get projects by proponent id."""
        return ProjectQueries.get_projects_by_proponent_id(proponent_id)

    @classmethod
    def bulk_add_projects(cls, account_id: int, project_ids: list):
        """Add projects in bulk."""
        projects = ProjectModel.get_all_projects_in_ids(project_ids)
        projects_to_add = [
            {"account_id": account_id, "project_id": project.id} for project in projects
        ]
        AccountProjectModel.add_projects_bulk(projects_to_add)
        return projects

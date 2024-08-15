"""Service for project management."""
from submit_api.models.account_project import AccountProject as ProjectModel


class ProjectService:
    """Project management service."""

    @classmethod
    def get_project_by_id(cls, _project_id):
        """Get project by id."""
        db_project = ProjectModel.find_by_id(_project_id)
        return db_project

    @classmethod
    def bulk_add_projects(cls, projects):
        """Add projects in bulk."""
        ProjectModel.add_projects_bulk(projects)
        return projects

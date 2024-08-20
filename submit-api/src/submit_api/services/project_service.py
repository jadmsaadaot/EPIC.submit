"""Service for project management."""
from submit_api.models.account_project import AccountProject as AccountProjectModel
from submit_api.models.project import Project as ProjectModel


class ProjectService:
    """Project management service."""

    @classmethod
    def get_project_by_id(cls, _project_id):
        """Get project by id."""
        db_project = ProjectModel.find_by_id(_project_id)
        return db_project

    @classmethod
    def bulk_add_projects(cls, account_id: int, project_ids: list):
        """Add projects in bulk."""
        projects = ProjectModel.get_all_projects_in_ids(project_ids)
        projects_to_add = [{
            'account_id': account_id,
            'project_id': project.id
        } for project in projects]
        AccountProjectModel.add_projects_bulk(projects_to_add)
        return projects

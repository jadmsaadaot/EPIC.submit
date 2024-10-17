# Copyright © 2024 Province of British Columbia
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Model to handle all complex operations related to User."""
from submit_api.models import AccountProject, Project, db
from submit_api.models.account_project_search_options import AccountProjectSearchOptions
from submit_api.models.package import Package
# pylint: disable=too-few-public-methods


class ProjectQueries:
    """Query module for complex projects queries"""

    @classmethod
    def get_projects_by_account_id(cls, account_id: int, search_options=AccountProjectSearchOptions):
        """Find projects by account_id with optional search and pagination."""
        query = db.session.query(AccountProject).filter(
            AccountProject.account_id == account_id
        ).join(Project)

        # Apply search filters if provided
        query = cls.filter_by_search_criteria(query, search_options)

        return query.all()

    @classmethod
    def get_projects_by_proponent_id(cls, proponent_id: int):
        """Find projects by proponent_id"""
        query = db.session.query(Project).filter(
            Project.proponent_id == proponent_id
        )
        return query.all()

    @classmethod
    def filter_by_search_criteria(cls, query, search_options):
        """Apply various filters based on search options."""
        if not search_options:
            return query

        query = cls._filter_by_search_text(query, search_options.search_text)

        return query

    @classmethod
    def _filter_by_search_text(cls, query, search_text):
        """Filter by search text across project name and package name."""
        if search_text:
            query = query.join(Package, AccountProject.packages).filter(
                Package.name.ilike(f"%{search_text}%")
            )
        return query

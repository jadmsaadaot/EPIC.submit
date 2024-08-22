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
from submit_api.models import db, AccountProject, Project


# pylint: disable=too-few-public-methods
class ProjectQueries:
    """Query module for complex projects queries"""

    @classmethod
    def get_projects_by_account_id(cls, account_id: int):
        """Find projects by account_id"""
        result = (db.session.query(AccountProject)
                  .filter(AccountProject.account_id == account_id)
                  .join(Project))
        return result

    @classmethod
    def get_projects_by_proponent_id(cls, proponent_id: int):
        """Find projects by proponent_id"""
        result = (db.session.query(Project)
                  .filter(Project.proponent_id == proponent_id))
        return result

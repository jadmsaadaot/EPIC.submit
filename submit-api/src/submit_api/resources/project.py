# Copyright © 2024 Province of British Columbia
#
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""API endpoints for managing a project resource."""

from http import HTTPStatus

from flask_restx import Namespace, Resource, cors

from submit_api.schemas.project import AddProjectSchema, ProjectSchema
from submit_api.services.project_service import ProjectService
from submit_api.utils.util import cors_preflight

from .apihelper import Api as ApiHelper


API = Namespace("projects", description="Endpoints for Project Management")
"""Custom exception messages
"""

project_add_list = ApiHelper.convert_ma_schema_to_restx_model(
    API, AddProjectSchema(), "Project Add"
)
project_list_model = ApiHelper.convert_ma_schema_to_restx_model(
    API, ProjectSchema(), "Project"
)


@cors_preflight("POST")
@API.route("", methods=["POST"])
class Projects(Resource):
    """Resource for managing projects."""

    @staticmethod
    @ApiHelper.swagger_decorators(API, endpoint_description="Add projects in bulk")
    @API.expect(project_add_list)
    @API.response(code=HTTPStatus.CREATED, model=project_list_model, description="Added projects")
    @API.response(HTTPStatus.BAD_REQUEST, "Bad Request")
    @cors.crossdomain(origin="*")
    def post():
        """Add projects in bulk."""
        projects_data = AddProjectSchema(many=True).load(API.payload)
        added_projects = ProjectService.bulk_add_projects(projects_data)
        return ProjectSchema(many=True).dump(added_projects), HTTPStatus.CREATED

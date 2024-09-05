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
"""API endpoints for managing a package resource."""

from http import HTTPStatus

from flask_restx import Namespace, Resource, cors

from submit_api.schemas.package import PackageSchema, PostPackageRequestSchema
from submit_api.services.package import PackageService
from submit_api.utils.util import cors_preflight

from .apihelper import Api as ApiHelper


API = Namespace("packages", description="Endpoints for Package Management")
"""Custom exception messages
"""

create_package_model = ApiHelper.convert_ma_schema_to_restx_model(
    API, PostPackageRequestSchema(), "Create a submission package"
)
package_model = ApiHelper.convert_ma_schema_to_restx_model(
    API, PackageSchema(), "Submission Package"
)


@cors_preflight("GET, OPTIONS, POST")
@API.route("/account-projects/<int:account_project_id>", methods=["POST", "GET", "OPTIONS"])
class PackageByAccountProject(Resource):
    """Resource for managing projects."""

    @staticmethod
    @ApiHelper.swagger_decorators(API, endpoint_description="Create a submission package")
    @API.expect(create_package_model)
    @API.response(
        code=HTTPStatus.CREATED, model=package_model, description="Submission Package"
    )
    @API.response(HTTPStatus.BAD_REQUEST, "Bad Request")
    @cors.crossdomain(origin="*")
    def post(account_project_id):
        """Create a submission package."""
        create_package_data = PostPackageRequestSchema().load(API.payload)
        created_package = PackageService.create_package(account_project_id, create_package_data)
        return PackageSchema().dump(created_package), HTTPStatus.CREATED

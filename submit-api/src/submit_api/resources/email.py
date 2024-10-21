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
"""API endpoints for managing an email resource."""

from http import HTTPStatus

from flask_restx import Namespace, Resource, cors

from submit_api.utils.util import cors_preflight

from ..auth import auth
from .apihelper import Api as ApiHelper
from ..services.chefs_service import ChefsApiService, EmailDetails

API = Namespace("email", description="Endpoints for sending emails")
"""Custom exception messages
"""


@cors_preflight("POST, OPTIONS")
@API.route("", methods=["POST", "OPTIONS"])
class Item(Resource):
    """Resource for managing projects."""

    @staticmethod
    @ApiHelper.swagger_decorators(
        API, endpoint_description="send email"
    )
    @API.response(HTTPStatus.BAD_REQUEST, "Bad Request")
    @cors.crossdomain(origin="*")
    # @auth.require
    def post():
        """Send email."""
        request_json = API.payload
        email_details = EmailDetails(
            **request_json
        )
        response_json, status = ChefsApiService().send_email(email_details)
        return response_json, status

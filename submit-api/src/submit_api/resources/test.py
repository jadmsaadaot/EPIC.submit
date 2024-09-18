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
"""API endpoints for testing the API."""

from http import HTTPStatus

from flask_restx import Namespace, Resource, cors

from submit_api.auth import auth
from submit_api.utils.util import cors_preflight


API = Namespace("test", description="Endpoints for test")
"""Custom exception messages
"""


@cors_preflight("GET, OPTIONS")
@API.route("", methods=["GET", "OPTIONS"])
class User(Resource):
    """Resource for testing the API."""

    @staticmethod
    @cors.crossdomain(origin="*")
    @auth.require
    def get():
        """Test endpoint."""
        return {'message': 'endpoint worked'}, HTTPStatus.OK

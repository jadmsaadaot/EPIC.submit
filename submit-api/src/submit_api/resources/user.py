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
"""API endpoints for managing an user resource."""

from http import HTTPStatus

from flask import jsonify, request

from submit_api.auth import auth
from submit_api.services.user_service import UserService
from flask_cors import cross_origin
from flask_restx import Namespace, Resource

from submit_api.utils.util import allowedorigins, cors_preflight

API = Namespace('user', description='Endpoints for User Management')
"""Custom exception messages
"""


@cors_preflight('GET, OPTIONS, POST')
@API.route('', methods=["POST", "GET", "OPTIONS"])
class Users(Resource):
    """Resource for managing users."""

    @staticmethod
    @cross_origin(origins=allowedorigins())
    @auth.require
    def get():
        """Fetch all users."""
        users = UserService.get_all_users()
        return jsonify(users), HTTPStatus.OK

    @staticmethod
    @cross_origin(origins=allowedorigins())
    @auth.require
    def post():
        """Create a user."""
        user_data = request.get_json()
        created_user = UserService.create_user(user_data)
        return created_user, HTTPStatus.CREATED


@cors_preflight('GET, OPTIONS, PATCH, DELETE')
@API.route('/<user_id>', methods=["PATCH", "GET", "OPTIONS", "DELETE"])
class User(Resource):
    """Resource for managing a single user"""

    @staticmethod
    @cross_origin(origins=allowedorigins())
    @auth.require
    def get(user_id):
        """Fetch a user by id."""
        user = UserService.get_user_by_id(user_id)
        return user, HTTPStatus.OK

    @staticmethod
    @cross_origin(origins=allowedorigins())
    @auth.require
    def patch(user_id):
        """Update a user by id."""
        user_data = request.get_json()
        updated_user = UserService.update_user(user_id, user_data)
        return updated_user, HTTPStatus.OK

    @staticmethod
    @cross_origin(origins=allowedorigins())
    @auth.require
    def delete(user_id):
        """Delete a user by id."""
        deleted_user_id = UserService.delete_user(user_id)
        return deleted_user_id, HTTPStatus.OK

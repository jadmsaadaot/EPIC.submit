# Copyright © 2019 Province of British Columbia
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


"""Service for integrating with the Common Hosted Email Service."""
import base64
import json
from typing import Optional

import requests
from attr import dataclass
from flask import current_app

from submit_api.utils.template import Template


@dataclass
class EmailDetails:
    """Email details class."""
    sender: str
    recipients: list[str]
    subject: str
    body: Optional[str]
    template_name: Optional[str] = None
    body_args: Optional[dict] = {}
    cc: Optional[list[str]] = []
    bcc: Optional[list[str]] = []


class ChefsApiService:
    """CHEFS api Service class."""

    def __init__(self):
        """Initiate class."""
        self.token_endpoint = current_app.config.get('CHES_TOKEN_ENDPOINT')
        self.service_client_id = current_app.config.get('CHES_CLIENT_ID')
        self.service_client_secret = current_app.config.get('CHES_CLIENT_SECRET')
        self.ches_base_url = current_app.config.get('CHES_BASE_URL')
        self.access_token = self._get_access_token()

    def _get_access_token(self):

        basic_auth_encoded = base64.b64encode(
            bytes(f'{self.service_client_id}:{self.service_client_secret}', 'utf-8')).decode('utf-8')
        data = 'grant_type=client_credentials'
        response = requests.post(
            self.token_endpoint,
            data=data,
            headers={
                'Authorization': f'Basic {basic_auth_encoded}',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )

        response_json = response.json()
        return response_json['access_token']

    @staticmethod
    def _get_email_body_from_template(template_name: str, body_args: dict):
        if not template_name:
            raise ValueError('Template name is required')

        template = Template.get_template(template_name)
        if not template:
            raise ValueError('Template not found')

        return template.render(body_args)

    def _get_email_body(self, email_details: EmailDetails):
        if email_details.body:
            body = email_details.body
            body_type = 'text'
        else:
            body = self._get_email_body_from_template(email_details.template_name, email_details.body_args)
            body_type = 'html'
        return body, body_type

    def send_email(self, email_details: EmailDetails):
        """Generate document based on template and data."""
        body, body_type = self._get_email_body(email_details)

        request_body = {
            'bodyType': body_type,
            'body': body,
            'subject': email_details.subject,
            'from': email_details.sender,
            'to': email_details.recipients,
            'cc': email_details.cc,
            'bcc': email_details.bcc
        }
        json_request_body = json.dumps(request_body)

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_token}'
        }

        url = f'{self.ches_base_url}/api/v1/email'
        return requests.post(url, data=json_request_body, headers=headers)

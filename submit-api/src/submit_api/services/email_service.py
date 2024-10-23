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


"""Service for sending emails."""
from threading import Thread, ThreadError

from flask import current_app
from requests.exceptions import RequestException

from submit_api.data_classes.email_details import EmailDetails
from submit_api.services.ches_service import ChesApiService


class EmailService:
    """Email Service class."""

    def __init__(self):
        """Initiate class."""
        self.email_api_service = ChesApiService()

    def send_email(self, email_details: EmailDetails):
        """Send email."""
        try:
            thread = Thread(
                target=self.email_api_service.send_email,
                args=(email_details,)
            )
            thread.start()
            return True
        except (ThreadError, RequestException) as e:
            current_app.logger.error(f"Error sending email: {e}")
            return False

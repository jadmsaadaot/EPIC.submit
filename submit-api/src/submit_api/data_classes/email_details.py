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
"""Data class for email details."""
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class EmailDetails:  # pylint: disable=too-many-instance-attributes
    """Email details class."""

    sender: str
    recipients: List[str]
    subject: str
    body: Optional[str] = None
    template_name: Optional[str] = None
    body_args: Optional[dict] = None
    cc: Optional[List[str]] = None
    bcc: Optional[List[str]] = None

    def __post_init__(self):
        """Post init method to initialize optional fields."""
        self.body_args = self.body_args or {}
        self.cc = self.cc or []  # pylint: disable=invalid-name
        self.bcc = self.bcc or []

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

"""Tests to verify the Engagement API end-point.

Test-Suite to ensure that the /Engagement endpoint is working as expected.
"""

import json

import pytest
from faker import Faker

from tests.unit.utils.enums import ContentType
from tests.utilities.factory_utils import factory_auth_header

from tests.utilities.factory_scenarios import TestJwtClaims, TestPackageInfo

fake = Faker()


@pytest.mark.parametrize('package_info', [TestPackageInfo.new_package])
def test_add_package(client, jwt, session, package_info):  # pylint:disable=unused-argument
    """Assert that a package can be POSTed."""
    headers = factory_auth_header(jwt=jwt, claims=TestJwtClaims.no_role)
    rv = client.post('/api/packages/', data=json.dumps(package_info),
                     headers=headers, content_type=ContentType.JSON.value)
    assert rv.status_code == 200

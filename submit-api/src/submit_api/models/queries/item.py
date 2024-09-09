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
"""Model to handle all complex operations related to Item."""
from sqlalchemy import func
from sqlalchemy.orm import subqueryload, joinedload

from submit_api.models import Item, db
from submit_api.models.submission import Submission


# pylint: disable=too-few-public-methods
class ItemQueries:
    """Query module for complex items queries"""

    @classmethod
    def get_item_by_id(cls, item_id: int):
        """Find an item by id and latest submissions"""
        subquery = (
            db.session.query(
                Submission.item_id,
                Submission.type,
                func.max(Submission.version).label('latest_version')
            )
            .group_by(Submission.item_id, Submission.type)
            .subquery()
        )

        query = (
            db.session.query(Item)
            .options(
                subqueryload(Item.submissions).options(
                    joinedload(Submission.submitted_form),
                    joinedload(Submission.document)
                )
            )
            .join(Item.submissions)
            .filter(
                Item.id == item_id,
                Submission.item_id == Item.id,
                Submission.type == subquery.c.type,
                Submission.version == subquery.c.latest_version
            )
        )

        result = query.first()
        return result

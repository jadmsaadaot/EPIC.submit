"""This module holds data classes."""

from typing import List, Optional

from attr import dataclass


@dataclass
class AccountProjectSearchOptions:  # pylint: disable=too-many-instance-attributes
    """Used to store account project search options."""

    search_text: str

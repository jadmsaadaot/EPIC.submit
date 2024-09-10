"""Service for item management."""

from submit_api.models import Item as ItemModel


class ItemService:
    """Item management service."""

    @classmethod
    def get_item_by_id(cls, item_id):
        """Get item by id."""
        item = ItemModel.find_by_id(item_id)
        return item
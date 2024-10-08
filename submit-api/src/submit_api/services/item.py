"""Service for item management."""

from submit_api.models import Item as ItemModel


class ItemService:
    """Item management service."""

    @classmethod
    def get_item_by_id(cls, item_id):
        """Get item by id."""
        item = ItemModel.find_by_id(item_id)
        return item

    @classmethod
    def update_item(cls, item_id, update_data):
        """Update item by id."""
        item = cls.get_item_by_id(item_id)
        if not item:
            raise ValueError(f"Item with id {item_id} not found.")

        for key, value in update_data.items():
            setattr(item, key, value)

        item.save()
        return item

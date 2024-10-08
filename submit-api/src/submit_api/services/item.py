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
        submission_item = cls.get_item_by_id(item_id)
        if not submission_item:
            raise ValueError(f"Item with id {item_id} not found.")

        for key, value in update_data.items():
            setattr(submission_item, key, value)

        submission_item.save()
        return submission_item

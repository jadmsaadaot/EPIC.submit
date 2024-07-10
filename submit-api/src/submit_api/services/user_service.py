"""Service for user management."""
from submit_api.models.user import User as UserModel
from submit_api.schemas.user import UserSchema


class UserService:
    """User management service."""

    @classmethod
    def get_user_by_id(cls, _user_id):
        """Get user by id."""
        user_schema = UserSchema()
        db_user = UserModel.find_by_id(_user_id)
        user = user_schema.dump(db_user)
        return user

    @classmethod
    def get_all_users(cls):
        """Get all users."""
        users = UserModel.get_all()

        user_schema = UserSchema(many=True)
        user = user_schema.dump(users)
        return user

    @classmethod
    def create_user(cls, user_data):
        """Create user."""
        created_user = UserModel.create_user(user_data)
        user_schema = UserSchema()
        return user_schema.dump(created_user)

    @classmethod
    def update_user(cls, user_id, user_data):
        """Update user."""
        updated_user = UserModel.update_user(user_id, user_data)
        user_schema = UserSchema()
        return user_schema.dump(updated_user)

    @classmethod
    def delete_user(cls, user_id):
        """Update user."""
        user = UserModel.find_by_id(user_id)
        if not user:
            return None

        user.delete()
        return user_id

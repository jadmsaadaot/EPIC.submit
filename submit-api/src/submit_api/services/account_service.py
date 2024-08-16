"""Service for account management."""
from submit_api.models import AccountRole as AccountRoleModel
from submit_api.models import AccountUser as AccountUserModel
from submit_api.models import Role as RoleModel
from submit_api.models.account import Account as AccountModel
from submit_api.models.db import session_scope
from submit_api.models.role import RoleEnum


class AccountService:
    """Account management service."""

    @classmethod
    def get_account_by_id(cls, _account_id):
        """Get account by id."""
        db_account = AccountModel.find_by_id(_account_id)
        return db_account

    @classmethod
    def get_account_by_proponent_id(cls, _proponent_id):
        """Get account by id."""
        db_account = AccountModel.get_by_proponent_id(_proponent_id)
        return db_account

    @classmethod
    def get_all_accounts(cls):
        """Get all accounts."""
        accounts = AccountModel.get_all()
        return accounts

    @classmethod
    def validate_create_account_data(cls, data):
        """Validate create account data."""
        proponent_id = data.get("proponent_id")
        if AccountModel.get_by_proponent_id(proponent_id):
            raise Exception(f'Account with proponent id {proponent_id} already exists.')

    @classmethod
    def create_account(cls, data):
        """Create account."""
        cls.validate_create_account_data(data)
        with session_scope() as session:
            account_data = {
                'proponent_id': data.get("proponent_id"),
            }
            account = AccountModel.create_account(account_data, session)
            account_user_data = {
                "account_id": account.id,
                "first_name": data.get("first_name"),
                "last_name": data.get("last_name"),
                "position": data.get("position"),
                "work_email_address": data.get("work_email_address"),
                "work_contact_number": data.get("work_contact_number"),
                'auth_guid': data.get('auth_guid')
            }
            account_user = AccountUserModel.create_account_user(account_user_data, session)

            account_admin_role = RoleModel.get_by_name(RoleEnum.ACCOUNT_PRIMARY_ADMIN.value)
            if not account_admin_role:
                raise Exception("Account admin role not found")

            account_role_data = {
                "account_user_id": account_user.id,
                "role_id": account_admin_role.id,
            }
            AccountRoleModel.create_account_role(account_role_data, session)

        return account

    @classmethod
    def update_account(cls, account_id, account_data):
        """Update account."""
        updated_account = AccountModel.update_account(account_id, account_data)
        return updated_account

    @classmethod
    def delete_account(cls, account_id):
        """Update account."""
        account = AccountModel.find_by_id(account_id)
        if not account:
            return None

        account.delete()
        return account

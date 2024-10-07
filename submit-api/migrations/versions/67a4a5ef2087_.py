from alembic import op
import sqlalchemy as sa

# Revision identifiers, used by Alembic
revision = '67a4a5ef2087'
down_revision = '9655618a231b'
branch_labels = None
depends_on = None

# Define the enums
itemstatus = sa.Enum('NEW_SUBMISSION', 'PARTIALLY_COMPLETED', 'COMPLETED', name='itemstatus')
temp_itemstatus = sa.Enum('PENDING', 'NEW_SUBMISSION', 'PARTIALLY_COMPLETED', 'COMPLETED', name='temp_itemstatus')


def upgrade():
    # Step 1: Create the temporary enum type with 'PENDING' included
    temp_itemstatus.create(op.get_bind(), checkfirst=False)

    # Step 2: Alter the column to use the temporary enum type, allowing both 'PENDING' and 'NEW_SUBMISSION'
    op.alter_column('items', 'status', type_=temp_itemstatus, postgresql_using='status::text::temp_itemstatus')

    # Step 3: Update all instances of 'PENDING' to 'NEW_SUBMISSION' in the items table
    op.execute("UPDATE items SET status = 'NEW_SUBMISSION' WHERE status = 'PENDING'")

    # Step 4: Drop the old enum type
    itemstatus.drop(op.get_bind(), checkfirst=False)

    # Step 5: Recreate the original enum with the new values (excluding 'PENDING')
    itemstatus.create(op.get_bind(), checkfirst=False)

    # Step 6: Alter the column to use the new version of the original enum
    op.alter_column('items', 'status', type_=itemstatus, postgresql_using='status::text::itemstatus')

    # Step 7: Drop the temporary enum type after migration
    temp_itemstatus.drop(op.get_bind(), checkfirst=False)


def downgrade():
    # Step 1: Update any instances of 'NEW_SUBMISSION' back to 'PENDING'
    op.execute("UPDATE items SET status = 'PENDING' WHERE status = 'NEW_SUBMISSION'")

    # Step 2: Create a temporary enum type with 'PENDING' included for smooth type conversion
    temp_itemstatus = sa.Enum('PENDING', 'NEW_SUBMISSION', 'PARTIALLY_COMPLETED', 'COMPLETED', name='temp_itemstatus')
    temp_itemstatus.create(op.get_bind(), checkfirst=False)

    # Step 3: Alter the column to use the temporary enum type, allowing for 'PENDING'
    op.alter_column('items', 'status', type_=temp_itemstatus, postgresql_using='status::text::temp_itemstatus')

    # Step 4: Drop the current enum type
    itemstatus.drop(op.get_bind(), checkfirst=False)

    # Step 5: Recreate the original enum type with 'PENDING' included
    old_itemstatus = sa.Enum('PENDING', 'COMPLETED', name='itemstatus')
    old_itemstatus.create(op.get_bind(), checkfirst=False)

    # Step 6: Alter the column to use the recreated original enum type
    op.alter_column('items', 'status', type_=old_itemstatus, postgresql_using='status::text::itemstatus')

    # Step 7: Drop the temporary enum type after the downgrade
    temp_itemstatus.drop(op.get_bind(), checkfirst=False)

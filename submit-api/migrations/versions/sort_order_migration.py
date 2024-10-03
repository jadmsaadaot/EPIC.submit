"""

Revision ID: 4a432db06bf1
Revises: 3eb2f30b742e
Create Date: 2024-10-01 15:05:18.694759

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "4a432db06bf1"
down_revision = "3eb2f30b742e"
branch_labels = None
depends_on = None

contact_information = "Contact Information"
contact_information_form = "Contact Information Form"
consultation_records = "Consultation Record(s)"
management_plan_submission = "Management Plan Submission"
management_plan = "Management Plan"


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("item_types", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("sort_order", sa.Integer(), nullable=True))

    with op.batch_alter_table("package_item_types", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("sort_order", sa.Integer(), nullable=True))

    # Update item type names
    op.execute(
        f"UPDATE item_types SET name = '{
            contact_information_form}', WHERE name = '{contact_information}'"
    )
    op.execute(
        f"UPDATE item_types SET name = '{
            management_plan}', WHERE name = '{management_plan_submission}'"
    )

    conn = op.get_bind()

    # Fetch the package_type_id for the Management Plan
    package_type_id = conn.execute(
        sa.text("SELECT id FROM package_types WHERE name = :name"),
        {'name': management_plan}
    ).fetchone()[0]

    # Fetch the item_type_ids for the associated item types
    item_types = conn.execute(
        sa.text("""
            SELECT id, name FROM item_types
            WHERE name IN ('Management Plan', 'Consultation Record(s)', 'Contact Information Form')
        """)
    ).fetchall()

    # Define sort orders for the item types
    sort_orders = {
        contact_information_form: 1,
        consultation_records: 2,
        management_plan: 3
    }

    # Prepare bulk update data
    bulk_updates = []
    for item_type in item_types:
        bulk_updates.append({
            'package_type_id': package_type_id,
            'item_type_id': item_type.id,
            'sort_order': sort_orders[item_type.name]
        })

    # Perform bulk update
    op.bulk_update_mappings(
        'package_item_types',
        bulk_updates
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # Drop `sort_order` column from `item_types` and `package_item_types`
    with op.batch_alter_table("item_types", schema=None) as batch_op:
        batch_op.drop_column("sort_order")

    with op.batch_alter_table("item_types", schema=None) as batch_op:
        batch_op.drop_column("sort_order")

    # Revert the item type names to their original values
    op.execute(
        f"UPDATE item_types SET name = '{
            contact_information}' WHERE name = '{contact_information_form}'"
    )
    op.execute(
        f"UPDATE item_types SET name = '{
            management_plan_submission}' WHERE name = '{management_plan}'"
    )

    op.execute(
        sa.text("""
            UPDATE package_item_types
            SET sort_order = NULL
            WHERE package_type_id = (
                SELECT id FROM package_types WHERE name = :name
            )
        """),
        {'name': 'Management Plan'}
    )

    # ### end Alembic commands ###

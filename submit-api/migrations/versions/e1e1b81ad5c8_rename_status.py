""" Rename aggregated_item_statuses to status

Revision ID: e1e1b81ad5c8
Revises: 8dff03f931d7
Create Date: 2024-10-16 11:09:18.732646

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import ENUM, ARRAY

# revision identifiers, used by Alembic.
revision = 'e1e1b81ad5c8'
down_revision = '8dff03f931d7'
branch_labels = None
depends_on = None


def upgrade():
    # Remove the existing status column
    op.drop_column('packages', 'status')

    # Rename aggregated_item_statuses to status
    op.alter_column(
        'packages',
        'aggregated_item_statuses',
        new_column_name='status',
        existing_type=ARRAY(
            ENUM('NEW_SUBMISSION', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SUBMITTED', name='packagestatus')),
        nullable=False
    )


def downgrade():
    # Add the status column back

    # Rename status back to aggregated_item_statuses
    op.alter_column(
        'packages',
        'status',
        new_column_name='aggregated_item_statuses',
        existing_type=ARRAY(ENUM('NEW_SUBMISSION', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SUBMITTED', name='packagestatus')),
        nullable=False
    )
    op.add_column(
        'packages',
        sa.Column('status', ENUM('NEW_SUBMISSION', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SUBMITTED', name='packagestatus'), nullable=True)
    )
    # populate status column with the first member of the existing aggregated_item_statuses or 'NEW_SUBMISSION' if empty
    op.execute(
        "UPDATE packages SET status = COALESCE(aggregated_item_statuses[1], 'NEW_SUBMISSION')"
    )
    # make status column not nullable
    op.alter_column('packages', 'status', nullable=False)
    # ### end Alembic commands ###

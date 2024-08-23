"""empty message

Revision ID: 646de6f8c38b
Revises: 0eabfcf062e3
Create Date: 2024-08-23 11:32:52.949718

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '646de6f8c38b'
down_revision = '0eabfcf062e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.alter_column('submitted_on',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.alter_column('submitted_by',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    with op.batch_alter_table('packages', schema=None) as batch_op:
        batch_op.alter_column('submitted_on',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.alter_column('submitted_by',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('packages', schema=None) as batch_op:
        batch_op.alter_column('submitted_by',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('submitted_on',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)

    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.alter_column('submitted_by',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('submitted_on',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)

    # ### end Alembic commands ###

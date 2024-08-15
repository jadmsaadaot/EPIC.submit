"""empty message

Revision ID: 6dfc3501adbb
Revises: 0223afc14044
Create Date: 2024-07-30 10:48:21.496460

"""
import sqlalchemy as sa
from alembic import op


# revision identifiers, used by Alembic.
revision = '6dfc3501adbb'
down_revision = '0223afc14044'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('roles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('roles', schema=None) as batch_op:
        batch_op.drop_column('description')

    # ### end Alembic commands ###

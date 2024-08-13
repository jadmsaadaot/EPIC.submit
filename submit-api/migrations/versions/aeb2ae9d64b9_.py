"""Add auth_guid column to account_users

Revision ID: aeb2ae9d64b9
Revises: 8e112bda0a34
Create Date: 2024-08-12 10:18:32.687612

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'aeb2ae9d64b9'
down_revision = '8e112bda0a34'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('staff_users', schema=None) as batch_op:
        batch_op.drop_index('ix_staff_users_username')

    op.drop_table('staff_users')
    with op.batch_alter_table('account_users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('auth_guid', sa.String(), nullable=False, unique=True))
        batch_op.create_index('ix_account_users_auth_guid', ['auth_guid'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('account_users', schema=None) as batch_op:
        batch_op.drop_index('ix_account_users_auth_guid')
        batch_op.drop_column('auth_guid')

    op.create_table('staff_users',
    sa.Column('created_date', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('updated_date', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('first_name', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('middle_name', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('last_name', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('username', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('email_address', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('contact_number', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('created_by', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.Column('updated_by', sa.VARCHAR(length=50), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='staff_users_pkey')
    )
    with op.batch_alter_table('staff_users', schema=None) as batch_op:
        batch_op.create_index('ix_staff_users_username', ['username'], unique=True)

    # ### end Alembic commands ###
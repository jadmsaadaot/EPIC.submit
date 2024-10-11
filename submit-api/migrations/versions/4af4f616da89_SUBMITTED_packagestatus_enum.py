""" Add the SUBMITTED status to the package status Enum

Revision ID: 4af4f616da89
Revises: 67a4a5ef2087
Create Date: 2024-10-09 15:55:18.284113

"""
from alembic import op


# revision identifiers, used by Alembic.
revision = '4af4f616da89'
down_revision = '67a4a5ef2087'
branch_labels = None
depends_on = None


def upgrade():
    # Add the new status to the Enum type
    op.execute("""
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type typ 
                       JOIN pg_enum en ON en.enumtypid = typ.oid 
                       WHERE typ.typname = 'packagestatus' AND en.enumlabel = 'SUBMITTED') THEN
            ALTER TYPE packagestatus ADD VALUE 'SUBMITTED';
        END IF;
    END$$;
    """)
    op.execute("""
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type typ 
                       JOIN pg_enum en ON en.enumtypid = typ.oid 
                       WHERE typ.typname = 'itemstatus' AND en.enumlabel = 'SUBMITTED') THEN
            ALTER TYPE itemstatus ADD VALUE 'SUBMITTED';
        END IF;
    END$$;
    """)


def downgrade():
    # Revert the Enum type changes
    pass

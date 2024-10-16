""" Add new package status values

Revision ID: 8dff03f931d7
Revises: 93d4a76d7623
Create Date: 2024-10-11 14:53:15.282072

"""
from alembic import op


# revision identifiers, used by Alembic.
revision = '8dff03f931d7'
down_revision = '93d4a76d7623'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type typ 
                       JOIN pg_enum en ON en.enumtypid = typ.oid 
                       WHERE typ.typname = 'packagestatus' AND en.enumlabel = 'PARTIALLY_COMPLETED') THEN
            ALTER TYPE packagestatus ADD VALUE 'PARTIALLY_COMPLETED';
        END IF;
    END$$;
    """)
    op.execute("""
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type typ 
                       JOIN pg_enum en ON en.enumtypid = typ.oid 
                       WHERE typ.typname = 'packagestatus' AND en.enumlabel = 'COMPLETED') THEN
            ALTER TYPE packagestatus ADD VALUE 'COMPLETED';
        END IF;
    END$$;
    """)
    op.execute("""
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type typ 
                       JOIN pg_enum en ON en.enumtypid = typ.oid 
                       WHERE typ.typname = 'packagestatus' AND en.enumlabel = 'NEW_SUBMISSION') THEN
            ALTER TYPE packagestatus ADD VALUE 'NEW_SUBMISSION';
        END IF;
    END$$;
    """)


def downgrade():
    pass

"""datetime to date

Revision ID: 25c9480ee19e
Revises: 916ea38dc8e0
Create Date: 2024-12-20 23:55:06.873563

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '25c9480ee19e'
down_revision: Union[str, None] = '916ea38dc8e0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('event', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               type_=sa.Date(),
               existing_nullable=False,
               existing_server_default=sa.text("timezone('utc'::text, now())"))
    op.alter_column('organization', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               type_=sa.Date(),
               existing_nullable=False,
               existing_server_default=sa.text("timezone('utc'::text, now())"))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('organization', 'created_at',
               existing_type=sa.Date(),
               type_=postgresql.TIMESTAMP(),
               existing_nullable=False,
               existing_server_default=sa.text("timezone('utc'::text, now())"))
    op.alter_column('event', 'created_at',
               existing_type=sa.Date(),
               type_=postgresql.TIMESTAMP(),
               existing_nullable=False,
               existing_server_default=sa.text("timezone('utc'::text, now())"))
    # ### end Alembic commands ###

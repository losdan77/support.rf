"""empty message

Revision ID: bcefe911f37e
Revises: 
Create Date: 2024-10-02 17:14:43.970420

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bcefe911f37e'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('city',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('theme_event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('theme_event', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('theme_event_index', 'theme_event', ['theme_event'], unique=False)
    op.create_table('type_organization',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type_organization', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('organization',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text("TIMEZONE('utc', now())"), nullable=False),
    sa.Column('photo_url', sa.String(), nullable=True),
    sa.Column('name_organization', sa.String(), nullable=True),
    sa.Column('site_url', sa.String(), nullable=True),
    sa.Column('phone_1', sa.String(), nullable=True),
    sa.Column('phone_2', sa.String(), nullable=True),
    sa.Column('about', sa.String(), nullable=True),
    sa.Column('FIO', sa.String(), nullable=True),
    sa.Column('id_city', sa.Integer(), nullable=True),
    sa.Column('id_type_organization', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['id_type_organization'], ['type_organization.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_index('email_index', 'organization', ['email'], unique=False)
    op.create_table('type_event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type_event', sa.String(), nullable=False),
    sa.Column('id_theme_event', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_theme_event'], ['theme_event.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('type_event_index', 'type_event', ['type_event'], unique=False)
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mark', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(), nullable=True),
    sa.Column('id_from', sa.Integer(), nullable=False),
    sa.Column('id_for', sa.Integer(), nullable=False),
    sa.CheckConstraint('mark in (1,2,3,4,5)', name='mark_1_2_3_4_5'),
    sa.ForeignKeyConstraint(['id_for'], ['organization.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['id_from'], ['organization.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('for_index', 'comment', ['id_for'], unique=False)
    op.create_table('event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('need_help', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text("TIMEZONE('utc', now())"), nullable=False),
    sa.Column('text', sa.String(), nullable=False),
    sa.Column('short_text', sa.String(), nullable=False),
    sa.Column('photo_url', sa.String(), nullable=True),
    sa.Column('people_count', sa.Integer(), nullable=True),
    sa.Column('latitude', sa.String(), nullable=False),
    sa.Column('longitude', sa.String(), nullable=False),
    sa.Column('id_organization', sa.Integer(), nullable=False),
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('id_type_event', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_city'], ['city.id'], ),
    sa.ForeignKeyConstraint(['id_organization'], ['organization.id'], ),
    sa.ForeignKeyConstraint(['id_type_event'], ['type_event.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('short_text_index', 'event', ['short_text'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('short_text_index', table_name='event')
    op.drop_table('event')
    op.drop_index('for_index', table_name='comment')
    op.drop_table('comment')
    op.drop_index('type_event_index', table_name='type_event')
    op.drop_table('type_event')
    op.drop_index('email_index', table_name='organization')
    op.drop_table('organization')
    op.drop_table('type_organization')
    op.drop_index('theme_event_index', table_name='theme_event')
    op.drop_table('theme_event')
    op.drop_table('city')
    # ### end Alembic commands ###

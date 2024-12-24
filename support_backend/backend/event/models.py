from sqlalchemy import Index, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.database import Base, intpk, str_not_null, str_null, created_at

class Event(Base):
    __tablename__ = 'event'

    id: Mapped[intpk]
    need_help: Mapped[bool] = mapped_column(nullable=False)
    created_at: Mapped[created_at]
    text: Mapped[str_not_null]
    short_text: Mapped[str_not_null]
    photo_url: Mapped[str_null] = mapped_column(default='/images/default.jpg')
    people_count: Mapped[int] = mapped_column(nullable=True)
    latitude: Mapped[str_not_null]
    longitude: Mapped[str_not_null]
    id_organization: Mapped[int] = mapped_column(ForeignKey('organization.id'),
                                                 nullable=False)
    id_city: Mapped[int] = mapped_column(ForeignKey('city.id'),
                                         nullable=True)
    id_type_event: Mapped[int] = mapped_column(ForeignKey('type_event.id'),
                                               nullable=False)
    
    organization: Mapped[list['Organization']] = relationship(back_populates='event')
    city: Mapped[list['City']] = relationship(back_populates='event')
    type_event: Mapped[list['Type_event']] = relationship(back_populates='event')

    __table_args__ = (
        Index('short_text_index', 'short_text'),
    )

    def __str__(self):
        return f'{self.short_text}'


class Type_event(Base):
    __tablename__ = 'type_event'

    id: Mapped[intpk]
    type_event: Mapped[str_not_null]
    id_theme_event: Mapped[int] = mapped_column(ForeignKey('theme_event.id'),
                                                nullable=False)
    
    event: Mapped[list['Event']] = relationship(back_populates='type_event')
    theme_event: Mapped[list['Theme_event']] = relationship(back_populates='type_event')
    
    __table_args__ = (
        Index('type_event_index', 'type_event'),
    )

    def __str__(self):
        return f'{self.type_event}'
    

class Theme_event(Base):
    __tablename__ = 'theme_event'

    id: Mapped[intpk]
    theme_event: Mapped[str_not_null]

    type_event: Mapped[list['Type_event']] = relationship(back_populates='theme_event')

    __table_args__ = (
        Index('theme_event_index', 'theme_event'),
    )

    def __str__(self):
        return f'{self.theme_event}'
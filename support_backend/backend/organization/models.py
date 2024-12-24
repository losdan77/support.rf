from sqlalchemy import Index, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from backend.database import Base, intpk, str_not_null, str_null, created_at

class Organization(Base):
    __tablename__ = 'organization'

    id: Mapped[intpk]
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    hashed_password: Mapped[str_not_null]
    role: Mapped[str_null]
    created_at: Mapped[created_at]
    photo_url: Mapped[str_null] = mapped_column(default='/images/default.jpg')
    name_organization: Mapped[str_null]
    site_url: Mapped[str_null]
    phone_1: Mapped[str_null]
    phone_2: Mapped[str_null]
    about: Mapped[str_null]
    FIO: Mapped[str_null]
    latitude: Mapped[str_null]
    longitude: Mapped[str_null]
    recovery_password_code: Mapped[str_null]
    
    
    id_city: Mapped[int] = mapped_column(ForeignKey('city.id'),
                                         nullable=True)
    id_type_organization: Mapped[int] = mapped_column(ForeignKey('type_organization.id'),
                                         nullable=False)
    
    city: Mapped[list['City']] = relationship(back_populates='organization')
    type_organization: Mapped[list['Type_organization']] = relationship(back_populates='organization')
    event: Mapped[list['Event']] = relationship(back_populates='organization')
    from_comment: Mapped[list['Comment']] = relationship(back_populates='from_organization', cascade='all,delete')
    for_comment: Mapped[list['Comment']] = relationship(back_populates='for_organization', cascade='all,delete')
 
    __table_args__ = (
        Index('email_index', 'email'),
    )

    def __str__(self):
        return f'{self.email}'
    

class City(Base):
    __tablename__ = 'city'

    id: Mapped[intpk]
    city: Mapped[str_not_null] 

    organization: Mapped[list['Organization']] = relationship(back_populates='city')
    event: Mapped[list['Event']] = relationship(back_populates='city')

    def __str__(self):
        return f'{self.city}'
    

class Type_organization(Base):
    __tablename__ = 'type_organization'

    id: Mapped[intpk]
    type_organization: Mapped[str_not_null]

    organization: Mapped[list['Organization']] = relationship(back_populates='type_organization')

    def __str__(self):
        return f'{self.type_organization}'



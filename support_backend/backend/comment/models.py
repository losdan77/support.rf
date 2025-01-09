from sqlalchemy import Index, ForeignKey, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship, backref
from backend.database import Base, intpk, str_not_null, str_null, created_at

class Comment(Base):
    __tablename__ = 'comment'

    id: Mapped[intpk]
    mark: Mapped[int] = mapped_column(nullable=False)
    text: Mapped[str_null]
    id_from: Mapped[int] = mapped_column(ForeignKey('organization.id',
                                                    ondelete='CASCADE',
                                                    onupdate='CASCADE'),
                                         nullable=False)
    id_for: Mapped[int] = mapped_column(ForeignKey('organization.id',
                                                   ondelete='CASCADE',
                                                   onupdate='CASCADE'),
                                        nullable=False)
    
    from_organization: Mapped[list['Organization']] = relationship(back_populates='from_comment')
    for_organization: Mapped[list['Organization']] = relationship(back_populates='for_comment') 

    __table_args__ = (
        CheckConstraint('mark in (1,2,3,4,5)', 'mark_1_2_3_4_5'),
        Index('for_index', 'id_for'),
        Index('from_index', 'id_from'),
    )

    def __str__(self):
        return f'{self.mark}'
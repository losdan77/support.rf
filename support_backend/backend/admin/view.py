from sqladmin import ModelView
from backend.organization.models import Organization, City, Type_organization
from backend.event.models import Event, Type_event, Theme_event
from backend.comment.models import Comment

class OrganizationAdmin(ModelView, model=Organization):
    column_exclude_list = [Organization.hashed_password]
    can_delete = False
    name = 'Организация'
    name_plural = 'Организации'
    icon = 'fa-solid fa-user'

class CityAdmin(ModelView, model=City):
    column_list = '__all__'
    name = 'Город'
    name_plural = 'Города'
    icon = 'fa-solid fa-city'

class TypeOrganizationAdmin(ModelView, model=Type_organization):
    column_list = '__all__'
    name = 'Тип организации'
    name_plural = 'Типы организаций'
    icon = 'fa-solid fa-book'

class EventAdmin(ModelView, model=Event):
    column_list = '__all__'
    name = 'Событие'
    name_plural = 'События'
    icon = 'fa-solid fa-event'

class TypeEventAdmin(ModelView, model=Type_event):
    column_list = '__all__'
    name = 'Тип события'
    name_plural = 'Типы событий'
    icon = 'fa-solid fa-book'

class ThemeEventAdmin(ModelView, model=Theme_event):
    column_list = '__all__'
    name = 'Тема события'
    name_plural = 'Темы событий'
    icon = 'fa-solid fa-book'

class CommentAdmin(ModelView, model=Comment):
    column_list = '__all__'
    name = 'Коментарий'
    name_plural = 'Коментарии'
    icon = 'fa-solid fa-book'
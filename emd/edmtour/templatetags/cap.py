from django import template
register = template.Library()
@register.filter(name="cap")
def capit(value):
    return value.upper()
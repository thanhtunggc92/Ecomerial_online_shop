from django.db.models.signals import pre_save,post_save
from django.contrib.auth.models import User


def updateUser(sender,instance, *args,**kwargs):
    user = instance
    if user.email != "" and user.username == "":
        user.username = user.email



post_save.connect(updateUser,sender=User)
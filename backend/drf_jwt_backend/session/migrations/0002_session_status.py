# Generated by Django 3.2.8 on 2022-04-14 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='status',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
# Generated by Django 3.2.8 on 2022-04-11 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='major',
            field=models.CharField(max_length=100, null=True),
        ),
    ]

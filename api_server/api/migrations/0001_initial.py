# Generated by Django 3.0.6 on 2020-05-13 10:47

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Crawler',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('code', models.CharField(max_length=20)),
                ('link', models.CharField(max_length=256)),
                ('trading_trend', django.contrib.postgres.fields.jsonb.JSONField()),
                ('analayzed_data', django.contrib.postgres.fields.jsonb.JSONField()),
                ('analyzed_data_probability', django.contrib.postgres.fields.jsonb.JSONField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('crawler', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Crawler')),
            ],
        ),
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=256)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('crawler', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Crawler')),
            ],
        ),
    ]
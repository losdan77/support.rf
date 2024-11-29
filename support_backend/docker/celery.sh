#!/bin/bash

celery --app=backend.tasks.celery_app:celery worker -l INFO
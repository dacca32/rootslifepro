#!/bin/sh

export PGUSER="postgres"

psql -c "CREATE DATABASE rootslife_db"
psql rootslife_test_db -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
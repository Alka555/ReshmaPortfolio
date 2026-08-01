# 06_DATABASE_SCHEMA

## Database

PostgreSQL (Supabase)

## Tables

Users Projects ProjectMedia Writing Categories Awards Testimonials
Messages Settings

## Project Fields

title slug client year category description thumbnail videoUrl featured
published

## Writing Fields

title category summary thumbnail externalUrl featured published

## Relationships

Category -\> Projects Category -\> Writing Project -\> Media

## Indexes

slug category featured published

Soft delete preferred.

# Database Guide

This database is required to run the application. It contains data for both users and events. It's based on a _Microsoft SQL Server_ docker image.

The port number is by default `1433`

## Prerequisites

- You must have Docker installed on your machine
- You need at least 1GB free disk space

## Launching the database for the first time

1. Create a new file in the _Database_ folder called `.env`
1. Inside this file, write `DATABASE_PASSWORD=` followed by a suitible password for your databse
   1. For example, your `.env` file could look like this: `DATABASE_PASSWORD=mysecurepassword`
1. Open your command line or terminal
1. Navigate to the "Database" folder
1. Run the following command:
   ```bash
   docker compose up
   ```
1. After a few seconds your database should be up.
1. For subsequent runs, you can start the database from _Docker Desktop_, or by running the same command

## Shutting down the database

- If you're running in the terminal, press `control + C`
- If you're running from _Docker Desktop_, press the stop-button

## Deleting the database

To delete the database, **including all data**, complete the following steps:

1. Open the _Database_ folder in your command line/terminal
1. Run the following command:
   ```bash
   docker compose down -v
   ```
1. Delete the folders `Database/mssql/data` and `Database/mssql/.initialized`

## For developers: adding startup-scripts

If you would like for more sql-commands to run on startup, do the following:

1. Navigate to the `Database/mssql/scripts/` folder. By default you'll find a file named _init.sql_
1. Either create a new file ending with `.sql` or add additional commands to the _init.sql_ file
1. If you've ran the database before, follow the steps in the _Deleting the database_ section, as these sql commands only run when the database is first created

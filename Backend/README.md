### the rootdir is wrong Fix


# Fixed verion
## Setup
### Make a postgreSQL database
You can do whats under in gitbash or make the database directly in docker if you know how  
- Go to the the folder you want to have the postgresql database  
- Write but change what's inside <> with your info  
  - docker pull postgres  
  - docker run --name <container_name> -e POSTGRES_PASSWORD=<POSTGRES_PASSWORD> -p <DB_PORT>:<DB_PORT> -d  postgres # not dure if -d postgres shuld be something  from your info
- This is only if you want to see if the database is set up right or have other acces to the SQL
  - docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>

### Make these files
-make an .env as in /backend/.env with whats under but but change what's inside <> with your info
  - DATABASE_URL=string ex. "postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:<DB_PORT>/<POSTGRES_DB>?schema=public"
  - PORT=number ex. 3000

### Run some commands
- Open a terminal and go into backend
- Run these:
  - npm i
- I don't think you need to run these but maybe, if not remove these points  
  - npm install --save-dev @types/node  
  - npm install --save-dev prisma dotenv  
- Then run this in it's own terminal  
  - npm run dev  
- Then run these:  
  - npx prisma generate
  - npx prisma db push
- or
  - npm run setmodel

### Setup done  
## After setup
Run each of these  
- run this each time you change .env  
  - npm run dev  
- run this each time you change schema.prisma
  -  npm run setmodel
- run this to reset the db
  - npm run resetdb
### Commands for backend (that i know works and might be accualy usefull)
- Starts backend (any changes to anything exept the database you'll need to re run this command)  
  - npm run dev &nbsp; &nbsp; &nbsp; &nbsp; # runs command: "tsx src/app.ts"  
- Puts the starting vaues in the database (need to add a check to we dont crash)  
  - npm run setval &nbsp; &nbsp; &nbsp; # runs command: "npx prisma db execute --file ./prisma/fill.sql --schema prisma/schema.prisma"  
- Makes the database refresh its tables with those from schema.prisma (need to add a check to we dont crash)  
  - npm run setmodel &nbsp;# runs command: "npx prisma generate && npx prisma db push"  
- Deletes both tables and values  
  - npm run delfully &nbsp; &nbsp; # runs command: "npx prisma migrate reset"  

.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
.  
# Bad version
ignore what is under

# To make backend work

## Make a postgreSQL database
- Open gitbash and do this
- Go to the project folder or Database folder
- Write but change what's inside <> with your info
  - docker pull postgres
  - docker run --name <container_name> -e POSTGRES_PASSWORD=<POSTGRES_PASSWORD> -p 5432:5432 -d postgres
  - docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>

## Make these files
make an .env as in /backend/.env with:
- DATABASE_URL=string ex. "postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>?schema=public"
- PORT=number ex. 3000

## Run these
- npm i
- npx prisma generate
- npx prisma db push
- npm install --save-dev @types/node
- npm install --save-dev prisma dotenv
- 
- npx prisma migrate dev --name init // unsure
- npx prisma studio // unsure

cd Backend
ts-node src/app.ts

### the rootdir is wrong Fix


# Fixed verion
## Setup
### Make a postgreSQL database
- Open gitbash and do this  
- Go to the project folder or Database folder  
- Write but change what's inside <> with your info
  - docker pull postgres
  - docker run --name <container_name> -e POSTGRES_PASSWORD=<POSTGRES_PASSWORD> -p 5432:5432 -d  postgres # not dure if -d postgres shuld be something  from your info
  - docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>

### Make these files
-make an .env as in /backend/.env with whats under but but change what's inside <> with your info
  - DATABASE_URL=string ex. "postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>?schema=public"
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

### Setup done  
## After setup
Run each of these
- npm run dev # run this each time you change .env
- npx prisma generate # run this and under each time you change schema.prisma
- npx prisma db push  
  
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

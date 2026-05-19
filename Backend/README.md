# Setup
## Make a postgreSQL database
### Change what's inside <> with your info  
### Either do whats under in gitbash or make the database directly in docker if you know how  
- Go to the the folder you want the postgreSQL database to be 



- #### Do one of these:  
- Either write  
  - docker pull postgres  
  - docker run --name Infoskjerm_contaner -e POSTGRES_PASSWORD=<POSTGRES_PASSWORD> -p 5432:5432 -d postgres
- Or make a docker-compose.yml file and fill it with:   
    ```yml
    services:  
      db:  
        image: postgres:16-alpine  
        container_name: Infoskjerm_contaner  
        restart: always  
        environment:  
          POSTGRES_USER: <POSTGRES_USER>  
          POSTGRES_PASSWORD: <POSTGRES_PASSWORD>  
          POSTGRES_DB: <POSTGRES_DB>  
        ports:  
          - "<PORT>:<PORT>"  
        volumes:  
          - ./pgdata:/var/lib/postgresql/data  
    volumes:  
      pgdata:
    ```  

  - #### Then write: 
    `docker compose up -d` in the same folder the yml file is


- You only need to do this if you want to have acces to the SQL in the database
  - docker exec -it <container_name> psql -U <POSTGRES_USER> -d <POSTGRES_DB>

### Make these files
- Make an .env as in /backend/.env with whats under but but change what's inside <> with your info  
  - For <AUTH_SECRET> Go to https://better-auth.com/docs/installation#set-environment-variables and click generate
```env
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:<DB_PORT>/<POSTGRES_DB>"
PORT=<PORT>
BETTER_AUTH_SECRET=<AUTH_SECRET>
BETTER_AUTH_URL=<BackendURL>
```
ex.
```env
DATABASE_URL="postgresql://My_USER50:mysecretpassword@localhost:5432/MY_DATABASE"
PORT="3001"
BETTER_AUTH_SECRET="UtsN4O7K7gItoIRDSLhGZfZ3f1pHuLoO"
BETTER_AUTH_URL="http://localhost:${PORT}"
```

### Run some commands
- Open a terminal and go into backend
- Run these:
  - npm i
- Then run either these:  
  - npx prisma generate
  - npx prisma db push
- or this:
  - npm run setdb
- Then run this in it's own terminal  
  - npm run dev  

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


## Other info:
- Something that is used semi-often is Type listefy, it takes an object and turns it into an object where each property becomes a list of the origanal property type


### please ignore z_test folder

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
- npm install --save-dev @types/node
- npm install --save-dev prisma dotenv // unsure
- npx prisma db push
- npx prisma migrate dev --name init // unsure
- npx prisma studio // unsure




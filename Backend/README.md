### please ignore z_test folder

# To make backend work

## Make these files
make an .env in ../backend/ with:
- DATABASE_URL=string ex. "postgresql://user:password@localhost:5432/mydb schema=public"
- PORT=number ex. 3000 // is how http requests gets sent to

## Run these
// forgot what order
- npm i
- npx prisma generate
- npm install --save-dev prisma dotenv

## Go to gitbash and do this
- Go to the project folder or Database folder
- Write
  - 
  - docker exec -it <container_name> bash
  - psql -U <POSTGRES_USER> -d <POSTGRES_DB>



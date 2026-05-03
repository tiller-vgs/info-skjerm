# To make backend work
## Run these
npm i
npx prisma generate
npm install --save-dev prisma dotenv
## Make these files
make an .env in ../backend/ with:
- DATABASE_URL=string ex. "postgresql://user:password@localhost:5432/mydb?schema=public"
- PORT=number ex. 5433
# Frontend startup guide

## Prerequisites

- Node with NPM installed
- Database being set up with a database password

## Set Up

1. Create a file named `.env` in this folder (Frontend/infoskjerm)
1. Fill out these following variables. Auth secret can be any string you want. Replace the _mysecurepassword_ property in the DATABASE_URL with the password you've configured your database with.
   ```
   AUTH_SECRET="YourAuthSecretHere"
   DATABASE_URL="postgresql://postgres:mysecurepassword@localhost:5432/info_skjerm"
   ```
1. Use your terminal, and navigate to this folder (Frontend/infoskjerm)
1. Run the command `npm install`

## Startup/shutdown

1. Navigate to this folder in your terminal (Frontend/infoskjerm)
1. Run the command `npm run dev`
1. Your website is now up on `http://localhost:3000`
1. To shut down the website, press `control` + `C`, followed by the letter `y` on the next prompt

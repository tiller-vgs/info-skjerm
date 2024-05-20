# Info skjerm
This is an informational screen created as a school project for Tiller VGS by a team of four:
- @Marcus-Aastum (Backend/Database design)
- @Hexcrow-k17 (Frontend/Visual design)
- @Sigdriv (Frontend)
- @JorgenMU (Backend)

This screen allows you to create events, and show them. You will also get information about the current and future weather, as well as bus departures from a nearby bus terminal, *Tillerterminalen*. 

### Demo site
A demo-site will from Monday the 20th be available on the url [https://infoskjerm.aastum.no/infoskjerm](https://infoskjerm.aastum.no/infoskjerm)

## Modules
### The informational screen is divided into three modules:
- **Frontend**
        - This is the actual website being shown to the user, and is the only part that should be accessible to a user.
        - The network port for this is by default `3000`, and is the only port to be forwarded to a user
- **Database**
    - This module stores all information about events and administrative users. This should not be accessible to a user.
    - The database is a docker container running Microsoft SQL Server
    - The network port for the database is by default `1433`
- **Backend**
    - This module handles all communication between the Frontend and the Database (with the exception of authentication of user, which is between the Database and Frontend directly).
    - It contains an API where you can get the following information:
        - Events (today, this week, by id, and all)
        - Bus departures from *Tillerterminalen*
        - Weather (today and this week)
    - It also allows you to create and delete events with POST- and DELETE-endpoints. 
    - The backend should only be accessible from the Frontend, as it has no built-in authentication. Users and administrators should never interact with the backend directly.
    - The network port for this is by default `5237`, but again should <ins>**never**</ins> be accessible outside the server, as it has no authentication.

## Initial setup
Before starting the setup process, create a password to be used for your database. This passwords must be at least 8 characters long, contain an upper- and lower case letter, as well as a number. This password must be the same across all modules when you get asked to enter a database password. 

All modules must be set up individually. The recommended order of modules to be set up is as follows:
1. [Database](/Database/)
2. [Backend](/Backend/info-skjerm-api/)
3. [Frontend](/frontend/info-skjerm/)

You can find detailed instructions by following the links above. 

### Prerequisites
You will need the following applications/packages to run this system:
- [.NET 8](https://dotnet.microsoft.com/en-us/download)
- [NodeJS with NPM](https://nodejs.org/en/download/prebuilt-installer/current) 
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Usage
To see the informational screen, go to {baseurl}/infoskjerm. This can be displayed on a TV in a public place for example. Here you'll see all events happening today.

To create an event, press the *Admin* button on the top of the screen. Log in with your account here. If you have not yet created an account, press *Har du ikke konto?*. Then you can create an event with a title, description, and start/end date. 
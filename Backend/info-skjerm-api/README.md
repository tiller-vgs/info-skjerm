# Backend Guide

The info-skjerm backend is responsible retrieval, processing and storage of data.
The program is mainly a rest api that has various endpoints, see swagger page for overview.

The default port is `5237`

## Prerequisites

You must have .NET 8 installed.

## Setup

To be able to use the events endpoints you need a appsettings.json file in your project with a connection string like this:

```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=info_skjerm;Username=postgres;Password=mysecurepassword;"
  }
}
```

The password need to match your database password. The file should be located like this: `Backend/info-skjerm-api/appsettings.json`

## Launching the backend

To launch the application:

1. Navigate to `\info-skjerm\Backend\info-skjerm-api` in your terminal
2. Run the command: `dotnet run build`
3. To open the swagger page (api documentation) type /swagger after the url, ie [http://localhost:5237/swagger](http://localhost:5237/swagger).

## Shutting down the backend

To shut down the application:

1. Enter the terminal that's running the program
2. press: `ctrl/command` + `c`

# Country Lookup Service

Allows user look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to EUR

## Endpoints

[COUNTRY LOOKUP](http://anyfin-api.ph3bian.com)

- POST /auth​/login (User log in)

- GET /countries?search={countryName} (Get country details from country name)

## Project Description (User Stories)

- User can look up a country by name and returns the full name, population and a list of its official currencies including current exchange rate to EUR

- User requests should require a valid JWT obtained from a separate /login endpoint and should be rate limited to 30 requests per token per minute





## Technologies Used

Built on the AdonisJs, AdonisJs is a Node.js web framework.

- Install the adonis cli using the command npm install -g @adonisjs/cli

- Clone repository


- Install npm dependencies


- Run migrations using command adonis migration:run


- Run seeders using command adonis seed


- Run application using adonis serve --dev


- Run application tests using adonis test

For more information visit [AdonisJs](https://adonisjs.com/)

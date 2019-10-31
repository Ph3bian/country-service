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

- Clone repository


- Install dependencies `npm install`

- Create a file .env at project root, and use .env.example as a sample to setup your environment variables. For database, setup psql and redis


- Run migrations using command `node ace migration:run --force`


- Run seeders using command `node ace seed`


- Run application using `node server.js`


- Run application tests using `node ace test`


For more information visit [AdonisJs](https://adonisjs.com/)

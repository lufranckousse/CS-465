# Travlr Getaways — Module Five

Module Five separates the Travlr REST API from the MVC website logic and uses the API to supply trip data to the customer-facing travel page.

## Requirements
- Node.js / npm
- MongoDB running locally on `mongodb://127.0.0.1:27017/travlr`, or set `MONGODB_URI`

## Setup and test
1. Run `npm install`.
2. Start MongoDB.
3. Run `npm run seed` to load `data/trips.json` into the `trips` collection.
4. Run `npm start`.
5. Open `http://localhost:3000/api/trips` to retrieve the complete trip collection.
6. Open `http://localhost:3000/api/trips/GALR` to retrieve a single trip by trip code.
7. Open `http://localhost:3000/travel` to verify the MVC page obtains and renders trip data through the REST API.
8. Test the same API URLs with Postman and verify HTTP status codes and JSON responses.

## Module Five implementation
- `app_api/controllers/trips.js`: Mongoose FIND operations for all trips and a specific trip code, with HTTP error handling.
- `app_api/routes/index.js`: REST routes for `GET /api/trips` and `GET /api/trips/:tripCode`.
- `app_api/models/travlr.js`: trip schema including an indexed trip code used by the parameterized API route.
- `app_server/controllers/travel.js`: uses Node's `fetch()` API to request JSON from `/api/trips` instead of querying MongoDB directly.
- `app_server/views/travel.hbs`: trip links target the individual REST API endpoint.
- `data/trips.json`: includes a unique code for each sample trip and remains available for database seeding/submission.

## Module 6 Admin SPA
The Angular admin SPA is in `app_admin`. It lists trips from the Express/MongoDB API and supports adding, editing, and deleting trips through GET, POST, PUT, and DELETE endpoints.

Run the Express backend from the project root with `npm start`, then run the Angular client in a second terminal with `cd app_admin && npm install && npm start`. Open `http://localhost:4200`.

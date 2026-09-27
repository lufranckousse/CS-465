# Travlr Getaways — Module Four

Module Four adds MongoDB access through Mongoose to the Travlr Express application.

## Requirements
- Node.js / npm
- MongoDB running locally on `mongodb://127.0.0.1:27017/travlr`, or set `MONGODB_URI`

## Setup and test
1. Run `npm install`.
2. Start MongoDB.
3. Run `npm run seed` to load `data/trips.json` into the `trips` collection.
4. Run `npm start`.
5. Open `http://localhost:3000/travel` to verify the customer-facing page reads trips from MongoDB.
6. Open `http://localhost:3000/api/trips` to verify the API returns trip data as JSON.
7. In MongoDB Compass, connect to `mongodb://127.0.0.1:27017`, open the `travlr` database and `trips` collection, and verify the three trip documents.

## Module Four implementation
- `app_api/models/db.js`: Mongoose connection and connection/error handling.
- `app_api/models/travlr.js`: trip schema with required-field validation.
- `app_api/controllers/trips.js`: retrieves trip documents and returns JSON.
- `app_api/routes/index.js`: exposes `GET /api/trips`.
- `app_api/models/seed.js`: loads the sample trips from `data/trips.json` into MongoDB.
- `app_server/controllers/travel.js`: renders the customer travel page using live MongoDB data.

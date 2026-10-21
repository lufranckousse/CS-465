# Travlr Getaways - Module 7

This version adds authentication and protected administrative operations to the Travlr full-stack application.

## Run the Express API

1. Start MongoDB.
2. From the `travlr` directory, run `npm install`.
3. Copy `.env.example` to `.env` and replace the example value with a long secret string.
4. Run `npm start`.
5. The REST API is available at `http://localhost:3000/api`.

## Run the Angular admin SPA

1. Open another terminal in `travlr/app_admin`.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:4200`.

## Authentication endpoints

- `POST /api/register` creates a user and returns a JSON Web Token.
- `POST /api/login` validates a user and returns a JSON Web Token.
- `GET /api/trips` and `GET /api/trips/:tripCode` remain available for trip retrieval.
- `POST`, `PUT`, and `DELETE` trip operations require an `Authorization: Bearer <token>` header.

The Angular admin application stores the current token in browser local storage, automatically adds it to protected API requests, hides administrative controls when logged out, and protects the add/edit routes.

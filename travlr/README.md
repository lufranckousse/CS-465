# CS 465 Module Two - Travlr Getaways

This project refactors the customer-facing Travlr Getaways application into an MVC structure and introduces Handlebars (HBS) templating for the Travel page.

## Module Two implementation

- Added `app_server/` to organize the MVC application.
- Moved Express routes and views into `app_server/`.
- Added `app_server/controllers/main.js` and `app_server/controllers/travel.js`.
- Added a `/travel` route that delegates rendering to the travel controller.
- Converted the static Travel page into `app_server/views/travel.hbs`.
- Added reusable Handlebars partials for the header and footer.
- Registered the Handlebars partials directory in `app.js`.
- Updated the Express views path to `app_server/views`.
- Kept the original static files in `public/` so CSS, images, and the remaining pages continue to work.

## Run locally

1. Open a terminal in the `travlr` folder.
2. Run `npm install`.
3. Run `npm start`.
4. Open `http://localhost:3000/travel` in a browser.

The `/travel` URL should render the Travel page through the MVC route, controller, and HBS view. The header and footer are rendered from Handlebars partials.

## Module Two Git workflow

Create the Module Two branch from the completed Module One work:

```bash
git checkout module1
git pull
git checkout -b module2
git add .
git commit -m "Module 2 completed baseline"
git push --set-upstream origin module2
```

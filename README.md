# scistarter-oauth

This is a test project detailing an integration with Scistarter OAuth.

## Getting Started

Prerequisites: Node, NPM: https://nodejs.org/en/

Installing dependencies:
`npm install`

Running the server:
`node app.js`

Then navigate to `http://localhost:3000` and you will be prompted to start a login flow via SciStarter

## Detailed Steps:
1. Provide a link to login with Scistarter (eg `http://sandbox.scistarter.com/authorize?response_type=code&client_id=1&scope=login`)
2. Provide an auth uri for SciStarter to redirect to (eg `/auth`)
2. Use API key and authorization code to post to http://sandbox.scistarter.com/token to get a access token.
3. Use access token to get info about the user http://sandbox.scistarter.com/api/user_data

Please contact kclough@jarv.us to get an API token, client Id, and configure your auth URIs.

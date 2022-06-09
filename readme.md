# Aggregate Report API
An API to store and maintain the aggregate of reports sent by agents from different markets.


## Installation Process

Before trying to install the app, please ensure you have a working installation of MongoDB, Node.js and npm.

1) Clone the repository
2) Run the following command
    ```bash
    $ npm install
    ```
## Running the code

First, you must run the MongoDB service on your local machine. It will run on port 27017 by default. Keep the service running.

Then, run the following command to ensure things are working as expected.
```bash
$ npm run test
```
If the installation was successful you will see that the result for all 4 tests are succesful.

Now you can run the server by using the following command:
```bash
$ node ./src/index.js
```
The server will be up on port 3000 of your local machine.

## API Documentation

### Registration Endpoint
This is the endpoint where the user registers.

Request URL : http://localhost:3000/user/register

A post request must be sent with a body similar to:

```javascript
{
    "name":"Test123",
    "password":"testuser1234",
    "email":"test@example.com"
}
```
The response will contain your username, email and a JWT token for you to use for requests that require authentication.
Keep in mind that your password must contain at least 8 letters.

### Authentication endpoint
This is the endpoint where the user logs in to obtain the JWT token.

Request URL: http://localhost:3000/user/login

A post request must be sent with a body similar to :

```javascript
{
    "email":"test@example.com",
    "password":"testuser1234"
}
```

The response is the same as that of the Registration endpoint.

### Post report endpoint
This is the endpoint where the agent posts the report.

A post request must be sent with an authorization header of the form "Bearer {your_token}".

Request URL: http://localhost:3000/reports

The request body must be as specified in the task document.

The response will also be as specified in the task document.

### Get aggregate report endpoint
This is the endpoint where one can get the aggregate report.

A get request must be sent with an authorization header of the form "Bearer {your_token}".

Request URL: http://localhost:3000/reports

The response will be as specified in the task document.

## Additional Note:
Also has functionality to store the individual reports made by the agents as it could be useful for analytics and other such things.
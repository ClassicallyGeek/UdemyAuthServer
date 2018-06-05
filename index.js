// Main starting point of the application
const express = require('express');
const http = require('http'); // Native Node Library that works with incoming http requests.
const bodyParser = require('body-parser'); // used to Parse incoming requests
const morgan = require('morgan'); // A logging framework.

const app = express();
const router = require ('./router');
// App Setup - Getting Express the way we want it.

/* Morgan and bodyParser is express middleware- any incoming request gets passed to these two */
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' })); // Parse incoming requests into JSON
router(app);

// Server Setup - Getting our Express App talking to the outside world.
const port = process.env.PORT || 3090;
const server = http.createServer(app); // Create an http server that knows how to receive requests & forward it on to the express application "app".
server.listen(port);
console.log('Server listening on: ', port);


// Mongoose is an "ORM" that deals with the database.

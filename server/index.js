const http = require('http');
const express = require('express');
const axios = require('axios');
var app = express();

// Your server will hold your bearer token
var bearer = '';

// This will allow us to hit our server from localhost:3000. Prevents cors issues
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});
app.use('/', express.static('build'));


app.get('/api/', (req,res) => {

    //Hint: You're going to want to encode your key and secret (https://developer.twitter.com/en/docs/basics/authentication/overview/application-only#issuing-application-only-requests)
    let consumer_key = encodeURIComponent('g3zihfr0Sx0OCleJsjZWmCdXo');
    let consumer_secret = encodeURIComponent('y7foai0FLTk7yWhr351qJ3B7RLJ1wO0oH5K4PnhmTmtc1VrQnP');

    // Token should be "Bearer token credentials"
    let token = consumer_key + ':' + consumer_secret;

    // Convert your token to base64
    let credentials = new Buffer(token).toString('base64');

    // Create headers for axios post request
    var headers = {
        "Authorization" : "Basic " + credentials,
        "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
    };

    // The body of the request
    var body = "grant_type=client_credentials";

    axios.post('https://api.twitter.com/oauth2/token', body, { headers })
    .then(response => {
        // console.log('RESPONSE CONSOLE LOG', response);

        bearer = response.data.access_token;
         console.log('bearer console logzzzz', bearer)
        res.send(response.data);
    })
    .catch(err => res.send(err.message));
});


// This route gets tweets!
app.get('/api/tweets/:s', (req,res) => {
  let search = encodeURIComponent(req.params.s);
  axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${search}&geocode=32.7157,-117.1611,10mi`, {
      headers: {
          'Authorization': `Bearer ${bearer}`,
      }
  })
  .then(response => {
    res.json(response.data);
  })
  .catch(err => {
    res.json(err.message);
  });
});


// This creates your server!
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

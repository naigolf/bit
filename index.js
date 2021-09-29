const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function() {
        console.log('running on port', app.get('port'))
    })
    
app.get('/', function (req, res) {
        res.end('bitkub api golf')
    })

var APIkey = process.env.APIkey;
var SECRETkey = process.env.SECRETkey;


//API info
var API_HOST = 'https://api.bitkub.com'
var API_KEY = APIkey
var API_SECRET = "b"+SECRETkey

//var access_token = 'Bearer {'+Token+'}'


var servertime = API_HOST + '/api/servertime'
var ts;
request.get(servertime, function (error, response, body) {
    if (!error && response.statusCode == 200) {                      
        //res.end(body.responses.text)
      ts = (body)
      console.log('Server time: ' + ts)

    }
})


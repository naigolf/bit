const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

var crypto = require('crypto');

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





var signature;
function sign(data){
var j = JSON.stringify(data);
console.log('Signing payload: ' + JSON.stringify(data))
	
var hmac = crypto.createHmac('sha256', API_SECRET )
                 .update(j)
                 .digest('hex')
console.log('hmac  ::' + hmac)
return hmac
}





app.get('/buy', function (req, res) {

let header = {
        'Accept': 'application/json',
	'Content-Type': 'application/json',
	'X-BTK-APIKEY': API_KEY,
    }
let data = {
	 'sym': 'THB_OMG',
	'amt': 10,  //THB amount you want to spend
	'rat': 0,
	'typ': 'market',
	'ts': ts,
    }	


signature = sign(data);
	
console.log('signature   : ' + signature)	
	
data = "sig " + signature
request.post({
        url: API_HOST + '/api/market/place-bid/test',
        headers: header,
        data: JSON.stringify(data)
    }, function (error, response, body){
    if (!error && response.statusCode == 200) {                      
      console.log('Payload :::: ' + body)
res.end(body)	    
    }
}
)	
	
	
/*	
var options = {
url: API_HOST + '/api/market/place-bid/test',
method: 'POST',
headers: { 
        'Accept': 'application/json',
	'Content-Type': 'application/json',
	'X-BTK-APIKEY': API_KEY,
   },
data: JSON.stringify({ 
        'sym': req.params.sym,
	'amt': req.params.amt,  //THB amount you want to spend
	'rat': 0,
	'typ': 'market',
	'ts': ts,
    })
};
		


request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {                      
      console.log('Payload :::: ' + body)
res.end(body)	    
    }
})

*/




})



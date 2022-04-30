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



	
	

var ts;	
var signature;

/*
function separators(data){
var uu = {"amt":10,
	  "rat":0,
	  "sym":"THB_OMG",
	  "ts":ts,
	  "typ":"market"
	 }
return 	uu
}
*/


function sign(dataget){
	
	///////////////////////////////////////////////
	
var timestampEncode = convert.utf8.encode(convert.jsonEncode(ts));
var secretEncode = convert.utf8.encode(API_SECRET);

console.log('timestampEncode: ' + timestampEncode)
console.log('secretEncode: ' + secretEncode)	
	
var hmacSha256 = new Hmac(sha256, secretEncode); // HMAC-SHA256
var digest = hmacSha256.convert(timestampEncode);
	
console.log('digest: ' + digest.toString())	
	
return digest.toString();
	
	
	/////////////////////////////////////////////////
	
	
	
//var j = separators(data);
	
///////console.log('Signing payload: ' + JSON.stringify(j))

//var hmac = crypto.createHmac('sha256', API_SECRET )
                 //.update(JSON.stringify(j))
                 //.digest('hex')
//console.log('hmac :' + hmac)
//return hmac
}




 
	

//////////////////////////////////////////////////////	

app.get('/buy', function (req, res) {
	
var servertime = API_HOST + '/api/servertime'
request.get(servertime, function (error, response, body) {
    if (!error && response.statusCode == 200) {                      
        //res.end(body.responses.text)
      ts = parseInt(body)
      console.log('Server time: ' + ts)
	   // return ts

 
/////////////////////////
	

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

//console.log('data === ' + JSON.stringify(data))

signature = sign(dataget);
//data = {'sig' : signature}
payload['sig'] = signature;
String payLoadJson = convert.jsonEncode(payload);
	    
	    


//['sig'] = signature
	    
console.log('data === ' + JSON.stringify(signature))
	
console.log('Payload with signature: ' + JSON.stringify(data))	

	    
	
	
	    
request.post({
        url: API_HOST + '/api/market/place-bid',
        headers: header,
        data: JSON.stringify(data)
    }, function (error, response, body){
	console.log('Response: ' + body)
    if (!error && response.statusCode == 200) {                      
      console.log('Response:  == 200 ' + body)
res.end(body)	    
    }
}
)	

	    
///////////////////	    
}
})  	    
//////////////////	    
	    
	    
	    
})



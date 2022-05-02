const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')

const CryptoJS = require('crypto-js');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function() {
        console.log('running on port', app.get('port'))
    })
    
app.get('/', function (req, res) {
        res.end('bitkub api golf')
    })

var APIkeyWRITE = process.env.APIkeyWRITE;
var SECRETkeyWRITE = process.env.SECRETkeyWRITE;

var APIkeyREAD = process.env.APIkeyREAD;
var SECRETkeyREAD = process.env.SECRETkeyREAD;



//API info
var API_HOST = 'https://api.bitkub.com'


/////////////////////////////////////////////////





	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

const getwallet = async() =>{

const headerConfigREAD = {//////////////////////////////////////
 headers:{
      Accept: 'application/json',
	'Content-Type': 'application/json',
	'X-BTK-APIKEY': APIkeyREAD,///////////////////////////////
    }	,
};


const url = API_HOST + "/api/market/wallet"
const ts = Date.now();
const data = {
ts : ts,
};


const sig = CryptoJS.HmacSHA256(
		JSON.stringify(data),
		SECRETkeyREAD///////////////////////////////////////
		).toString();
data['sig'] = sig;




try {
    const response = await axios.post(url, data, headerConfigREAD);////////////////////////////////////////////
    console.log(response.data);

  } catch (error) {
    console.error(error);
  }

}
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////

const buyorder = async() =>{

const headerConfigWRITE = {////////////////////////////////////
 headers:{
      Accept: 'application/json',
	'Content-Type': 'application/json',
	'X-BTK-APIKEY':APIkeyWRITE,///////////////////////////////
    }	,
};


const url = API_HOST + '/api/market/place-bid'
const ts = Date.now();

const data = {
	'sym': 'THB_OMG',
	'amt': 10,  //THB amount you want to spend
	'rat': 0,
	'typ': 'market',
	'ts': ts,
    };

const sig = CryptoJS.HmacSHA256(
		JSON.stringify(data),
		SECRETkeyWRITE///////////////////////////////////////
		).toString();
data['sig'] = sig;




try {
    const response = await axios.post(url, data, headerConfigWRITE);////////////////////////////////////////////
    console.log(response.data);

  } catch (error) {
    console.error(error);
  }

}


	/////////////////////////////////////////////////





app.get('/wallet', function (req, res) {

getwallet();        
res.end('bitkub api golf')
    })

	/////////////////////////////////////////////////

app.get('/buy', function (req, res) {

buyorder();        
res.end('bitkub api golf')
    })



	/////////////////////////////////////////////////


var express = require('express')
var app = express()
var gdax = require('./inc/gdax.js')

const axios = require('axios');
const moment = require('moment');

const passPhrase = "4rz00xbb5fw";//g3qw3q22g9l";
const apiKey = "b9f78af7b3e3d814c68942d6e413ea9b";//4332c122bfa49f178b9a795ca546c3e3";
const base64secret = "riPy7vwD22b6MUOOetmaQ9CT5XoziPoi1G+JcorbpF8RTENmfrEjqk0fxVZ8m3nqPX3F3YMuArpjHEGojZ8cWQ==";//gD2aCs4dLa0S5a0WKXIFL+0RQlMXBLLVwID5sm/FhsdrZBVYIZmAEuDNGRzU+M0tyt6k/bDK1JT4codp5oMVUg==";//

//"https://public.sandbox.gdax.com"; https://api-public.sandbox.gdax.com/
const GdaxAPI = 'https://api.gdax.com';

const Gdax = require('gdax');
const LTCUSD = new Gdax.PublicClient('LTC-USD');
const BTCUSD = new Gdax.PublicClient('BTC-USD');
const ETHUSD = new Gdax.PublicClient('ETH-USD');
const authenticatedClient = new Gdax.AuthenticatedClient(apiKey, base64secret, passPhrase, GdaxAPI);

// 5 min = 300000


var findPrices = function(){

	let timeFactor = 1;
	let granularity = 1;

	LTCUSD
		.getProductHistoricRates({
			'start': moment().subtract(timeFactor, 'minute').toISOString(),
			'end': moment().toISOString(),
			'granularity': granularity
		},(error, response, data) => {
			if (error){
				return console.dir(error);
			}
	      	else{
      			console.log(data);
	      	}

		});
}

// app.use(findPrices);

app.get('/', function (req, res, next) {
  	
  	findPrices();
})

app.listen(8000, function () {
  	console.log('Trader Start =============================>')
})



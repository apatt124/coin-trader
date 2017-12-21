const axios = require('axios');
const moment = require('moment');

const Keys = require('keys.js');
const passPhrase = Keys.passPhrase;
const apiKey = Keys.apiKey;
const base64secret = Keys.base64secret;

const GdaxAPI = 'https://api.gdax.com';//"https://public.sandbox.gdax.com"; https://api-public.sandbox.gdax.com/

const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient('LTC-USD');
const authenticatedClient = new Gdax.AuthenticatedClient(apiKey, base64secret, passPhrase, GdaxAPI);

const websocket = new Gdax.WebsocketClient(['LTC-USD']);


// --------------- Price feed stuff
websocket.on('message', data => { 
	// console.log(data.price);
	process.stdout.write("LTC TradingPrice: $" + data.price + "\r");
});
websocket.on('error', err => { 
	console.log(err);
});
websocket.on('close', () => { 
	console.log("===================> LTC Ticker Closed")
});

// -------------- Account retreival
// authenticatedClient.getAccounts(callback);

let candles = [];

// 5 min = 300000
let timeFactor = 5;
let granularity = 1;

let findPrices = function(req, res, next){
	publicClient
	.getProductHistoricRates({
		'start': moment().subtract(timeFactor, 'minute').toISOString(),
		'end': moment().toISOString(),
		'granularity': granularity
	},(error, response, data) => {
		if (error){
			return console.dir(error);
		}
      	else{
		    console.dir(data);
		    return(data);
      	}
		// console.log('Candles:');
		// console.dir(candles);
		return('This is a test return');
	});
	next();
}

// callback(error, response, data){
//     if (error)
//         return console.dir(error);
//     candles.push({
//     	'time': moment(data[0]).format('M/D/YY'),
//     	'low': data[1],
//     	'high': data[2],
//     	'open': data[3],
//     	'close': data[4],
//     	'volume': data[5]
//     });
//     return console.dir(data);
// }


// publicClient.getProductHistoricRates({
// 	'start': moment().subtract((timeFactor * 3), 'milliseconds').toISOString(), 
// 	'end': moment().subtract((timeFactor * 2), 'milliseconds').toISOString(),
// 	'granularity': timeFactor
// }, callback);


// publicClient.getProducts((error, response, data) => {
//   if (error) {
//     // handle the error
//     console.log(error)
//   } else {
//     // work with data
//     console.log(response)
//   }
// });


// axios.get(GdaxAPI + '/products/LTC-USD/ticker')
// 	.then((price) => {
// 		console.log(price.data);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	})






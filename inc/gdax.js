const axios = require('axios');
const moment = require('moment');

const passPhrase = "4rz00xbb5fw";//g3qw3q22g9l";
const apiKey = "b9f78af7b3e3d814c68942d6e413ea9b";//4332c122bfa49f178b9a795ca546c3e3";
const base64secret = "riPy7vwD22b6MUOOetmaQ9CT5XoziPoi1G+JcorbpF8RTENmfrEjqk0fxVZ8m3nqPX3F3YMuArpjHEGojZ8cWQ==";//gD2aCs4dLa0S5a0WKXIFL+0RQlMXBLLVwID5sm/FhsdrZBVYIZmAEuDNGRzU+M0tyt6k/bDK1JT4codp5oMVUg==";//

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






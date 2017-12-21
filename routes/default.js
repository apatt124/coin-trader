const router  = require('express').Router();
const Gdax = require('gdax');
const axios = require('axios');
const moment = require('moment');

const GdaxAPI = 'https://api.gdax.com';
const LTCUSD = new Gdax.PublicClient('LTC-USD');
const BTCUSD = new Gdax.PublicClient('BTC-USD');
const ETHUSD = new Gdax.PublicClient('ETH-USD');

let LTCticker = "XXXXX.XXX";
let timeFactor = 1;
let granularity = 10;	

let getLitecoin = () => {
	return axios.get(GdaxAPI + "/products/LTC-USD/candles", 
		{
			'start': moment().subtract(timeFactor, 'minute').toISOString(),
			'end': moment().toISOString(),
			'granularity': granularity,
		})
}

let getBitcoin = () => {
	return axios.get(GdaxAPI + "/products/BTC-USD/candles", 
		{
			'start': moment().subtract(timeFactor, 'minute').toISOString(),
			'end': moment().toISOString(),
			'granularity': granularity,
		})
}

let getEthereum = () => {
	return axios.get(GdaxAPI + "/products/ETH-USD/candles", 
		{
			'start': moment().subtract(timeFactor, 'minute').toISOString(),
			'end': moment().toISOString(),
			'granularity': granularity,
		})
}

axios.all([
		getLitecoin(),
		getBitcoin(),
		getEthereum(),
	])
  .then(axios.spread((LTC, BTC, ETH) => {
  	console.log("LTC:");
  	console.dir(LTC.data);
  	console.log("BTC:");
  	console.dir(BTC.data);
  	console.log("ETH:");
  	console.dir(ETH.data);
  }))
  .catch((err) => {
  	console.log(error);
  });




router.get('/', (req, res) => {
	
	LTCUSD
	.getProductTicker((error, response, data) => {
	  if (error) {
	    console.log(error);
	  } else {
	  	console.log(parseFloat(data.price).toFixed(2));
	    res.render('default', {
		    title: 'Alex\'s Algorithm',
		    LTCticker: parseFloat(data.price).toFixed(2)
		});
	  }
	})
});


module.exports = router;

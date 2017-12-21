const express      = require('express');
const router  	= require('express').Router();
const app      	= express();
const server	= require('http').createServer(app);
const io 		= require('socket.io')(server);
const Gdax 		= require('gdax');
const axios 	= require('axios');
const moment 	= require('moment');

const GdaxAPI 	= 'https://api.gdax.com';
const LTCUSD 	= new Gdax.PublicClient('LTC-USD');
const BTCUSD 	= new Gdax.PublicClient('BTC-USD');
const ETHUSD 	= new Gdax.PublicClient('ETH-USD');

let BTCticker 	= "XXXXX.XX";
let ETHticker 	= "XXXXX.XX";
let LTCticker 	= "XXXXX.XX";
let timeFactor 	= 1;
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
  	// console.log("LTC:");
  	// console.dir(LTC.data);
  	// console.log("BTC:");
  	// console.dir(BTC.data);
  	// console.log("ETH:");
  	// console.dir(ETH.data);
  }))
  .catch((err) => {
  	console.log(error);
  });

router.get('/', (req, res) => {

	axios.all([
		axios.get(GdaxAPI + "/products/BTC-USD/ticker"),	// Get Bitcoin Product Ticker
		axios.get(GdaxAPI + "/products/ETH-USD/ticker"),	// Get Ethereum Product Ticker
		axios.get(GdaxAPI + "/products/LTC-USD/ticker"),	// Get Litecoin Product Ticker
	])
	  .then(axios.spread((BTC, ETH, LTC) => {
	  	res.render('default', {
		    title: 'Alex\'s Algorithm',
		    BTCticker: parseFloat(BTC.data.price).toFixed(2),
		    ETHticker: parseFloat(ETH.data.price).toFixed(2),
		    LTCticker: parseFloat(LTC.data.price).toFixed(2)
		});
	  }))
	  .catch((err) => {
	  	console.log(error);
	  });
});


module.exports = router;

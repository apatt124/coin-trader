$(document).ready(function(){
	var socket = io();
	socket.on('serverStart', () => {
		console.log("Server Start");
	});

	socket.on('BTC-USD', data => {	
		$("#btc-ticker").html(parseFloat(data.price).toFixed(2));
	});

	socket.on('ETH-USD', data => {	
		$("#eth-ticker").html(parseFloat(data.price).toFixed(2));
	});

	socket.on('LTC-USD', data => {	
		$("#ltc-ticker").html(parseFloat(data.price).toFixed(2));
	});
	// socket.on()
	// var socket = io('wss://ws-feed.gdax.com');
	// socket.on('connect', (data) => {
	// 	console.log('connected');
	// 	socket.send(JSON.stringify({
	// 	    "type": "subscribe",
	// 	    "product_ids": [
	// 	        "LTC-USD"
	// 	    ],
	// 	    "channels": [
	// 	        "level2",
	// 	        "heartbeat",
	// 	        {
	// 	            "name": "ticker",
	// 	            "product_ids": [
	// 	                "LTC-BTC"
	// 	            ]
	// 	        }
	// 	    ]
	// 	}));
	// })
	// socket.on('subscriptions', data => {
	// 	console.log(data);
	// })
	// socket.on('message', data =>{
	// 	console.log(data.price);
	// })
	console.log('test');
});
//to view es6 capabilities see http://node.green/
//node v8-options es6 module syntax currently under development (2016/06/25)
let path         	= require('path');
let express      	= require('express');
let cookieParser 	= require('cookie-parser');
let bodyParser   	= require('body-parser');
let loki         	= require('lokijs');
let routes       	= require('./routes');

//setup
let database 		= new loki('database.loki', { autoload: true, autosave: true });
let app      		= express();
let server	 		= require('http').createServer(app);
let io 		 		= require('socket.io')(server);
let Gdax 			= require('gdax');
let Keys			= require('./inc/keys.js');
let websocket	= new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD', 'LTC-USD'],
		'wss://ws-feed.gdax.com',
		{
			key: Keys.apiKey,
			secret: Keys.base64secret,
			passphrase: Keys.passPhrase,
		},
		{ heartbeat: true }
  	);

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));

io.on('connection', () => {
	console.log("Client Connected");
	io.emit('serverStart');
});

//Price feed stuff
websocket.on('message', data => { 
	switch(data.product_id){
		case 'BTC-USD':
			io.emit('BTC-USD', {price: data.price});
			break;
		case 'ETH-USD':
			io.emit('ETH-USD', {price: data.price});
			break;
		case 'LTC-USD':
			io.emit('LTC-USD', {price: data.price});
			break;
		default:
			break;
	}
	// process.stdout.write("LTC TradingPrice: $" + data.price + "\r");
	
});
websocket.on('error', err => { 
	console.log(err);
});
websocket.on('close', () => { 
	console.log("===================> LTC Ticker Closed")
});

//loki db reference for the router
app.use((req, res, next) => { req.database = database; next(); });

//router
routes.create(app);

//server
server.listen(app.get('port'), () => console.log('Listening on http://localhost:' + app.get('port')));

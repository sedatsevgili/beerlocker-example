var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');
var ejs = require('ejs');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'ejs');

app.use(session({
	secret: 'Super Secret Session Key',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.route('/beers')
	.post(authController.isAuthenticated, beerController.postBeers)
	.get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
	.get(authController.isAuthenticated, beerController.getBeer)
	.put(authController.isAuthenticated, beerController.putBeer)
	.delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
	.post(authController.isAuthenticated, clientController.postClients)
	.get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
	.get(authController.isAuthenticated, oauth2Controller.authorization)
	.post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
	.post(authController.isClientAuthenticated, oauth2Controller.token);

app.use('/api', router);
app.listen(3000);

console.log('listening on 3000');

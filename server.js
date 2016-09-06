var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.route('/beers')
	.post(beerController.postBeers)
	.get(beerController.getBeers);

router.route('/beers/:beer_id')
	.get(beerController.getBeer)
	.put(beerController.putBeer)
	.delete(beerController.deleteBeer);

router.route('/users')
	.post(userController.postUsers)
	.get(userController.getUsers);

app.use('/api', router);
app.listen(3000);

console.log('listening on 3000');

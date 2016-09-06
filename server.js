var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.get('/', function(req, res) {
	res.json({message: 'You are running dangerously low on beer!!'})
});

var beersRoute = router.route('/beers');
var beerRoute = router.route('/beers/:beer_id');

beersRoute.post(function(req, res) {
	// create a new beer
	var beer = new Beer();

	beer.name = req.body.name;
	beer.type = req.body.type;
	beer.quantity = req.body.quantity;

	beer.save(function(err) {
		if(err) {
			return res.send(err);
		}
		res.json({message:'Beer added to the locker!', data: beer});
	});
});

beersRoute.get(function(req, res) {
	Beer.find(function(err, beers) {
		if(err) {
			res.send(err);
		}
		res.json(beers);
	});
});

beerRoute.get(function(req, res) {
	Beer.findById(req.params.beer_id, function(err, beer) {
		if(err) {
			return res.send(err);
		}
		res.json(beer);
	});
});

beerRoute.put(function(req, res) {
	Beer.findById(req.params.beer_id, function(err, beer) {
		if(err) {
			return res.send(err);
		}
		
		beer.quantity = req.body.quantity;
		
		beer.save(function(err) {
			if(err) {
				return res.send(err);
			}
			res.json(beer);
		});
	});
});

beerRoute.delete(function(req, res) {
	Beer.findByIdAndRemove(req.params.beer_id, function(err) {
		if(err) {
			return res.send(err);
		}

		res.json({message: 'Beer removed from the locker!'});
	});
});

app.use('/api', router);
app.listen(port);
console.log('Insert beer on port ' + port);

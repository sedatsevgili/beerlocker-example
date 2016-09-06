var Beer = require('../models/beer');

exports.postBeers = function(req, res) {
	var beer = new Beer();
	beer.name = req.body.name;
	beer.type = req.body.type;
	beer.quantity = req.body.quantity;
	
	beer.save(function(err) {
		if(err) {
			return res.send(err);
		}
		res.json({message: 'Beer added to the locker!', data: beer});
	});
};

exports.getBeers = function(req, res) {
	Beer.find(function(err, beers) {
		if(err) {
			return res.send(err);
		}
		res.json(beers);
	});
};

exports.getBeer = function(req, res) {
	Beer.findById(req.params.beer_id, function(err, beer) {
		if(err) {
			return res.send(err);
		}
		res.json(beer);
	});
};

exports.putBeer = function(req, res) {
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
};

exports.deleteBeer = function(req, res) {
	Beer.findByIdAndRemove(req.params.beer_id, function(err) {
		if(err) {
			return res.send(err);
		}
		res.json({message: 'Beer removed from the locker!'});
	});
};

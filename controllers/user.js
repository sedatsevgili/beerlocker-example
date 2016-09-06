var User = require('../models/user');

exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if(err) {
			return res.send(err);
		}

		res.json({message: 'New beer drinker added to the locker room!'});
	});
};

exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if(err) {
			return res.send(err);
		}

		return res.json(users);
	});
};

var express = require('express');
var request = require('request');
var querystring = require('querystring');
var app = express();

var scistarterHost = 'http://sandbox.scistarter.com';
var oauthClientId = 1;
var apiKey = 'b84f6aeddb62743be1a024a8f094d6f23487ced3a4aaed9364f3ea7bd0331e366c40298a4bca25f6f26b4fbdb548591d2ecc012035b26be77e810ab03a85c27e';

app.use(express.static('public'));

app.get('/auth_code', function(req, res) {
	var postBody = {
		grant_type: 'authorization_code',
		code: req.query.code,
		client_id: oauthClientId
	};

	// 1. Get access token from SciStarter using provided authorization code
	request({
		url: scistarterHost + '/token',
		qs: {
			key: apiKey,
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		method: 'POST',
		body: querystring.stringify(postBody)
	}, function(error, response, body) {
		if(!error) {
			var result = JSON.parse(body);

			// 2. Use access token to get data about the user from SciStarter
			if(result && result.access_token) {
				request({
					url: scistarterHost + '/api/user_data',
					qs: {
						'access_token': result.access_token
					},
					method: 'GET'
				}, function(error, response, body) {
					if(!error) {
						var result = JSON.parse(body);

						if(result.data) {
							res.send('Authenticated ' + result.data.email);
						}
					}
					res.end();
				});
			}
		}
	});
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
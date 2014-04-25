/*
 * GET home page.
 */
var Travis = require('travis-ci');

exports.index = function(req, res) {
	res.render('index', {
		title: 'Search'
	});
};

var func3 = function(req, res, callback) {
	for(var i in res.builds) {
		for(var j in res.builds[i].job_ids) {
			console.log(res.builds[i].job_ids[j]);
			travis.jobs({
	    		id: res.builds[i].job_ids[j]
			}, function (err, res) {
				console.log(res);
			});
		}
	}
}

exports.search = function(req, response) {
	var travis = new Travis({
  		version: '2.0.0'
	});
	travis.repos.builds({
	    owner_name: 'mozilla-b2g',
	    name: 'gaia'
	}, function (err, res) {
		console.log(res);
		response.render('search/index', {
			title: 'Search Page',
			table_title: 'mozilla-b2g/gaia',
			builds: res.builds
		});
	});
	// res.redirect( '/' );
};

exports.job = function(req, response) {
	var travis = new Travis({
  		version: '2.0.0'
	});
	console.log(req.params.id);
	travis.jobs.log({
    	job_id: req.params.id
	}, function (err, res) {
		response.render('job/index', {
			title: 'Search Page',
			table_title: 'mozilla-b2g/gaia',
			log_txt: res
		});
	});
	// res.redirect( '/' );
};
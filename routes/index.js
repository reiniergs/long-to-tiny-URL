var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/set', function(req, res) {
   var id = global.urls.generate(req.query.url);	
   res.json({ id : id, urls : global.urls });
});

router.get('/:id', function(req, res) {
	var url = global.urls.findWhere({ token : req.params.id}).get('long');
	    url = url.slice(0,7) === 'http://' ? url : 'http://' + url;
    res.redirect(301,url);
});

module.exports = router;

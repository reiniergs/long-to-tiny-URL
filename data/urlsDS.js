var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');


var urlDS = Backbone.Collection.extend({
    generate : function (longUrl) {
    	var d = new Date();
    	this.add({ token : String(d.getTime()) , long : longUrl });
    	return d.getTime();
    }
});

module.exports = new urlDS(); 

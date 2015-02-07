var $ = require('jquery'); 
var React = require('react');
var validUrl = require('valid-url');
    

var App = React.createClass({displayName: 'App',
	getInitialState : function () {
        return { message : '' };
	},
	componentDidMount : function () {
		
	},
	render : function () {
	    return (
	    React.createElement("div", null, 	
	    	React.createElement("div", {className: "small-4 columns small-centered"}, 
	    	    React.createElement("div", {className: "small-12 columns"}, 
			      	React.createElement("input", {ref: "url", onInput: this._addHttp, placeholder: "Enter the long URL..."})
			    ), 	
			    React.createElement("div", {className: "small-12 columns"}, 
			        React.createElement("button", {className: "button success round expand", type: "button", onClick: this._onClick}, "Generate tiny URL")
			    )
		    ), 
		    React.createElement("div", {className: "small-12 columns", style: { textAlign : 'center'}}, 
		    	React.createElement("h4", null, React.createElement("a", {href: this.state.message}, this.state.message))
		    )
		)    	
	    );  	
	},
	_onClick :  function () {
		if (validUrl.isUri(this.refs.url.getDOMNode().value)) {
			$.ajax({
				url : '/set',
				data : { url : this.refs.url.getDOMNode().value },
				beforeSend : function () {
					this.setState({ message : 'processing...'});
				}.bind(this)
			}).done(function (res) {
				this.setState({ message : window.location.origin + '/' + res.id })
				console.log(res);
			}.bind(this));
		} else { 
           alert('Not Uri!');
		}
	},
	_addHttp : function () {
		var url = this.refs.url.getDOMNode().value;
		if (url.slice(0,7) != 'http://')  
			this.refs.url.getDOMNode().value = url.length < 7 ? 'http://' :  'http://' + url;
	}	
}); 


$(document).ready(function () {
    React.render(
		React.createElement(App, null),
	   	document.getElementById('app') 
	); 
});

var $ = require('jquery'); 
var React = require('react');
var validUrl = require('valid-url');
    

var App = React.createClass({
	getInitialState : function () {
        return { message : '' };
	},
	componentDidMount : function () {
		
	},
	render : function () {
	    return (
	    <div>	
	    	<div className='small-12 large-4 columns small-centered'>
	    	    <div className='small-12 columns'>
			      	<input ref='url' onInput={this._addHttp} placeholder='Enter the long URL...'/>
			    </div>	
			    <div className='small-12 columns'> 
			        <button className='button success round expand' type='button' onClick={this._onClick}>Generate tiny URL</button>
			    </div>
		    </div> 
		    <div className='small-12 columns' style={{ textAlign : 'center' }}>
		    	<h4><a href={this.state.message}>{this.state.message}</a></h4>
		    </div> 
		</div>    	
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
		<App  />,
	   	document.getElementById('app') 
	); 
});

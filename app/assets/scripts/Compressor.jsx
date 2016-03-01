var React = require('react');
var ReactDOM = require('react-dom');
var Tangle = require('./tangle.js');

var Compressor = React.createClass({
  handleChange:function(){

  },
  render:function(){
    return(
      <div className="compressorDiv">
        <Tangle
          value={5}
          onChange={this.handleChange}
          className="tangleInput"
        />
      </div>
    );
  }

});

module.exports = Compressor;

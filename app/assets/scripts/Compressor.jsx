var React = require('react');
var ReactDOM = require('react-dom');
var Tangle = require('./tangle.js');

var Compressor = React.createClass({
  handleChange:function(){

  },
  render:function(){
    return(
      <div className="compressorHolder">
        <div className="compressorTitle">
          <div className="buttonsInsideTrack" onClick={this.OnOffDelay}> COMPRESSOR </div>
        </div>
      <div className="compressorDiv">
        <div className="compressorRow">
          <div className="compressorName">
            Knee :
            <Tangle
              value={6}
              onChange={this.handleChange}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Ratio :
            <Tangle
              value={5}
              onChange={this.handleChange}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Threshold:
            <Tangle
              value={5}
              onChange={this.handleChange}
              className="tangleInput"
            />
          </div>
        </div>
        <div className="compressorRow">
          <div className="compressorName">
            Attack :
            <Tangle
              value={5}
              onChange={this.handleChange}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Release :
            <Tangle
              value={5}
              onChange={this.handleChange}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Makeup :
            <Tangle
              value={5}
              onChange={this.handleChange}
              className="tangleInput"
            />
          </div>
        </div>
      </div>
      </div>
    );
  }

});

module.exports = Compressor;

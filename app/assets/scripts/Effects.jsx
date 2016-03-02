var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var EQ = require('./EQ.jsx');
var Delay = require('./Delay.jsx');
var Tuna = require('tunajs');
var Compressor = require('./Compressor.jsx');
var Reverb  = require('./Reverb.jsx');
var Phaser = require('./Phaser.jsx');


var Effects = React.createClass({

  componentDidMount: function(){
    var tuna = new Tuna(audioContext);
    this.refs['Delay'].setTuna(tuna);
    this.refs['Compressor'].setTuna(tuna);
    this.refs['Reverb'].setTuna(tuna);
    this.refs['Phaser'].setTuna(tuna);
  },
  setPropsToEffects: function(params){
    this.refs['EQ'].setWaveform(params);
    this.refs['Delay'].setWaveform(params);
    this.refs['Compressor'].setWaveform(params);
    this.refs['Reverb'].setWaveform(params);
    this.refs['Phaser'].setWaveform(params);
  },

  render: function (){

    return(
      <div className="trackAudioEffectsPanel">
        <Reverb ref="Reverb" />
        <Delay ref="Delay" />
        <Compressor ref="Compressor" />
        <EQ ref="EQ" />
        <Phaser ref="Phaser" />
      </div>
    );
  }


});

module.exports = Effects;

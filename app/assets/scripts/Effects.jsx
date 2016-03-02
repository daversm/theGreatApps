var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var EQ = require('./EQ.jsx');
var Delay = require('./Delay.jsx');
var Tuna = require('tunajs');
var Compressor = require('./Compressor.jsx');
var Reverb  = require('./Reverb.jsx');


var Effects = React.createClass({
  getInitialState: function() {
    return {valueDelayFeedBack:50, valueDelayTime : 10, valueReveb: 80, valueEQ:50  };
  },
  componentDidMount: function(){
    var tuna = new Tuna(audioContext);
    this.refs['Delay'].setTuna(tuna);
    this.refs['Compressor'].setTuna(tuna);
    this.refs['Reverb'].setTuna(tuna);
  },
  setPropsToEffects: function(params){
    this.refs['EQ'].setWaveform(params);
    this.refs['Delay'].setWaveform(params);
    this.refs['Compressor'].setWaveform(params);
    this.refs['Reverb'].setWaveform(params);
  },
  handleDelayFeedBack: function(value){
    reverb.gainNode.gain.value = value/100;
    this.setState({
      valueDelayFeedBack: value,
    });
  },
  handleDelayTime: function(value){
    //reverb.gainNode.gain.value = value/100;
    this.setState({
      valueDelayTime: value,
    });
  },
  handleReverb: function(value){
    //reverb.gainNode.gain.value = value/100;
    this.setState({
      valueReveb: value,
    });
  },
  handleEQ: function(e){
    console.log(e.target.frq);
    this.setState({
      valueEQ: e.target.value
    });
  },
  render: function (){

    return(
      <div className="trackAudioEffectsPanel">
        <Compressor ref="Compressor" />
        <EQ ref="EQ" />
        <Reverb ref="Reverb" />
        <Delay ref="Delay" />
      </div>
    );
  }


});

module.exports = Effects;

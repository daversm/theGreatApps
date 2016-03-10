var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var EQ = require('./EQ.jsx');
var Delay = require('./Delay.jsx');
var Tuna = require('tunajs');
var Compressor = require('./Compressor.jsx');
var Reverb  = require('./Reverb.jsx');
var Phaser = require('./Phaser.jsx');
var Volume = require('./Volume.jsx');


var Effects = React.createClass({
  propTypes: {
    statusError : React.PropTypes.func
  },
  getInitialState: function(){
    return({listOfEffects:[]});
  },
  componentDidMount: function(){

    this.effectsStatusList = {Phaser:false, Delay:false, Compressor:false, Reverb:false, EQ:false};
    var tuna = new Tuna(audioContext);
    this.refs['Delay'].setTuna(tuna);
    this.refs['Compressor'].setTuna(tuna);
    this.refs['Reverb'].setTuna(tuna);
    this.refs['Phaser'].setTuna(tuna);
    this.refs['EQ'].create();
  },
  setPropsToEffects: function(params){
    this.wavesurfer = params;
    this.refs['EQ'].setWaveform(params);
    this.refs['Delay'].setWaveform(params);
    this.refs['Compressor'].setWaveform(params);
    this.refs['Reverb'].setWaveform(params);
    this.refs['Phaser'].setWaveform(params);
    this.refs['Volume'].setWaveform(params);
  },
  handleEffectsPower: function(e){
    this.state.listOfEffects.length = 0;

    //console.log(this.effectsStatusList);
    if(this.effectsStatusList[e] == true){
      this.effectsStatusList[e] = false;
    }else if (this.effectsStatusList[e] == false){
      this.effectsStatusList[e] = true;
    }

    //console.log(this.effectsStatusList);
    //console.log(this.state.listOfEffects);

    for (var effects in this.effectsStatusList){
      if(this.effectsStatusList[effects]){
        //console.log("Calling Child : " + effects);
        this.refs[effects].OnOff();
        //console.log(this.state.listOfEffects);
      }
    }

    console.log(this.state.listOfEffects);
    if(this.state.listOfEffects.length == 0){
      //console.log("clearing effects");
      this.wavesurfer.backend.disconnectFilters();
    }else{
      //console.log("Adding effects");
      this.wavesurfer.backend.setFilters(
        this.state.listOfEffects.map(function(i){
          return i;
        })
      );
    }
  },

  render: function (){

    return(
      <div className="trackAudioEffectsPanel">
        <Reverb ref="Reverb" onClick={this.handleEffectsPower} list={this.state.listOfEffects} statusError={this.props.statusError}/>
        <Delay ref="Delay" onClick={this.handleEffectsPower} list={this.state.listOfEffects} statusError={this.props.statusError}/>
        <Compressor ref="Compressor" onClick={this.handleEffectsPower} list={this.state.listOfEffects} statusError={this.props.statusError}/>
        <EQ ref="EQ" onClick={this.handleEffectsPower} list={this.state.listOfEffects} statusError={this.props.statusError}/>
        <Phaser ref="Phaser" onClick={this.handleEffectsPower} list={this.state.listOfEffects} statusError={this.props.statusError}/>
        <Volume ref="Volume" statusError={this.props.statusError}></Volume>
      </div>
    );
  }


});

module.exports = Effects;

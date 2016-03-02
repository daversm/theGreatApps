var React = require('react');
var ReactDOM = require('react-dom');


var Reverb = React.createClass({
  getInitialState: function(){
    return({wetLevel:25, dryLevel:100});
  },
  handleWet:function(e){
    this.convolver.wetLevel = e.target.value/100;
    this.setState({wetLevel: e.target.value});
  },
  handleDry: function(e){
    this.convolver.dryLevel= e.target.value/100;
    this.setState({dryLevel: e.target.value});
  },
  setWaveform: function(param){
    console.log('wavesurfer set delay');
    this.wavesurfer = param;
  },
  OnOffReverb: function(e){
    console.log(this.convolver);
    if(this.power){
      console.log('now off');
      this.wavesurfer.backend.disconnectFilters();
      this.power = false;
    }else{
      console.log('now on');
      this.wavesurfer.backend.setFilters([this.convolver]);
      this.power = true;
    }
  },
  setTuna: function(param){
    this.tuna = param;

    this.convolver = new this.tuna.Convolver({
      highCut: 22050,                         //20 to 22050
      lowCut: 80,                             //20 to 22050
      dryLevel: 1,                            //0 to 1+
      wetLevel: .25,                            //0 to 1+
      level: 1,                               //0 to 1+, adjusts total output of both wet and dry
      impulse: "../../public/EffectsAddOns/VocalDuo.wav",    //the path to your impulse response
      bypass: 0
    });

  },
  reverbPick: function(){

  },
  render: function(){

    return(
      <div className='reverbHolder'>
        <div className="delayTitle">
          <div className="buttonsInsideTrack" onClick={this.OnOffReverb}> REVERB </div>
        </div>
        <div className="reverbDiv">
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.wetLevel}%</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.wetLevel} onChange={this.handleWet} />
            <div className="effectsInfo">Wet</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.dryLevel}%</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.dryLevel} onChange={this.handleDry} />
            <div className="effectsInfo">Dry</div>
          </div>
        </div>
      </div>

    );
  }

});

module.exports = Reverb;

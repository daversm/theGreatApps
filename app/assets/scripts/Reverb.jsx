var React = require('react');
var ReactDOM = require('react-dom');


var Reverb = React.createClass({
  getInitialState: function(){

    this.defaultOption = { value: 'two', label: 'Two' };
    return({power:false});
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
      lowCut: 20,                             //20 to 22050
      dryLevel: 1,                            //0 to 1+
      wetLevel: 1,                            //0 to 1+
      level: 1,                               //0 to 1+, adjusts total output of both wet and dry
      impulse: "../../public/EffectsAddOns/smooth-hall.wav",    //the path to your impulse response
      bypass: 0
    });

  },
  reverbPick: function(){

  },
  render: function(){

    return(
      <div className='delayHolder'>
        <div className="delayTitle">
            <div className="buttonsInsideTrack" onClick={this.OnOffReverb}> DELAY </div>
        </div>

      </div>

    );
  }

});

module.exports = Reverb;

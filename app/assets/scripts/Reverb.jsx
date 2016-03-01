var React = require('react');
var ReactDOM = require('react-dom');

var Reverb = React.CreateClass({
  setWaveform: function(param){
    console.log('wavesurfer set delay');
    this.wavesurfer = param;
  },
  OnOffReverb: function(e){
    console.log(this.Compressor);
    if(this.power){
      console.log('now off');
      this.wavesurfer.backend.disconnectFilters();
      this.power = false;
    }else{
      console.log('now on');
      this.wavesurfer.backend.setFilters([this.compressor]);
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
      impulse: "impulses/impulse_rev.wav",    //the path to your impulse response
      bypass: 0
    });

  },
  render: function(){
    return(
      <div className='delayHolder'>
        <div className="delayTitle">
          <div className="buttonsInsideTrack" onClick={this.OnOffReverb}> REVERB </div>
        </div>
        <div className="delayDiv">
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
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.feedBack}x</div>
            <input className="sliderSizeVertical" type="range" min='0' max='60' value={this.state.feedBack} onChange={this.handleFeedBack} />
            <div className="effectsInfo">Repeat</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.delayTime}ms</div>
            <input className="sliderSizeVertical" type="range" min='0' max='1000' value={this.state.delayTime} onChange={this.handleDelayTime} />
            <div className="effectsInfo">Delay</div>
          </div>
        </div>
      </div>

    );
  }

});

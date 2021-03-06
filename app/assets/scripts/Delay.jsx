var React = require('react');
var ReactDOM = require('react-dom');

var Delay = React.createClass({
  getInitialState: function(){
    this.power = false;
    return({wetLevel:25, dryLevel:100, feedBack:45, delayTime:150, powerSlider:false, buttonClass:"buttonsInsideTrack"});
  },
  setTuna: function(param){
    this.tuna = param;

    this.delay = new this.tuna.Delay({
    feedback: 0.45,    //0 to 1+
    delayTime: 150,    //how many milliseconds should the wet signal be delayed?
    wetLevel: 0.25,    //0 to 1+
    dryLevel: 1,       //0 to 1+
    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
  });

  },
  handleWet:function(e){
    this.delay.wetLevel = e.target.value/100;
    this.setState({wetLevel: e.target.value});
  },
  handleDry: function(e){
    this.delay.dryLevel= e.target.value/100;
    this.setState({dryLevel: e.target.value});
  },
  handleFeedBack: function(e){
    this.delay.feedback = e.target.value/100;
    this.setState({feedBack: e.target.value});
  },
  handleDelayTime: function(e){
    this.delay.delayTime = e.target.value;
    this.setState({delayTime: e.target.value});
  },
  setWaveform: function(param){

    this.wavesurfer = param;
  },
  OnOff: function(){
    this.props.list.push(this.delay);

  },
  handleClick: function(){
    if(!this.wavesurfer){
      this.props.statusError();
      return;
    }
    if(this.power){
      this.setState({buttonClass:'buttonsInsideTrack'});
      this.power = false;
    }else{
      this.setState({buttonClass:'buttonsInsideTrackClicked'});
      this.power = true;
    }
    this.props.onClick('Delay');
  },
  render: function(){
    return(
      <div className='delayHolder'>
        <div className="delayTitle">
          <div className={this.state.buttonClass} onClick={this.handleClick}> DELAY </div>
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

module.exports = Delay;

var React = require('react');
var ReactDOM = require('react-dom');

var Phaser = React.createClass({
  getInitialState: function(){
    this.power = false;
    return({rate:1.2, depth:3, feedback:2, stereoPhase:30, baseModulationFrequency:1000, buttonClass:"buttonsInsideTrack"});
  },
  setTuna: function(param){
    this.tuna = param;

    this.phaser = new this.tuna.Phaser({
      rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
      depth: 0.3,                    //0 to 1
      feedback: 0.2,                 //0 to 1+
      stereoPhase: 30,               //0 to 180
      baseModulationFrequency: 1000,  //500 to 1500
      bypass: 0
    });

  },
  handleRate:function(e){
    this.phaser.rate = e.target.value;
    this.setState({rate: e.target.value});
  },
  handleDepth: function(e){
    this.phaser.depth = e.target.value/100;
    this.setState({depth: e.target.value});
  },
  handleFeedBack: function(e){
    this.phaser.feedback = e.target.value/100;
    this.setState({feedback: e.target.value});
  },
  handleBaseMod: function(e){
    //console.log(e.target.value);
    //this.phaser.baseModulationFrequency = e.target.value;
    this.setState({baseModulationFrequency: e.target.value});
  },
  handleStereoPhase: function(e){
    this.phaser.stereoPhase = e.target.value;
    this.setState({stereoPhase: e.target.value});
  },
  setWaveform: function(param){
    this.wavesurfer = param;
  },
  OnOff: function(){
    this.props.list.push(this.phaser);

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
    this.props.onClick('Phaser');
  },
  render: function(){
    return(
      <div className='phaserHolder'>
        <div className="delayTitle">
          <div className={this.state.buttonClass} onClick={this.handleClick}> PHASER </div>
        </div>
        <div className="phaserDiv">
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.rate}%</div>
            <input className="sliderSizeVertical" type="range" min='0' max='8' value={this.state.rate} onChange={this.handleRate} />
            <div className="effectsInfo">Rate</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.depth}%</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.depth} onChange={this.handleDepth} />
            <div className="effectsInfo">Depth</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.feedback}x</div>
            <input className="sliderSizeVertical" type="range" min='0' max='60' value={this.state.feedback} onChange={this.handleFeedBack} />
            <div className="effectsInfo">FeedBack</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.baseModulationFrequency}hz</div>
            <input className="sliderSizeVertical" type="range" min='0' max='1000' value={this.state.baseModulationFrequency} onChange={this.handleBaseMod} />
            <div className="effectsInfo">Frq</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.stereoPhase}ms</div>
            <input className="sliderSizeVertical" type="range" min='0' max='180' value={this.state.stereoPhase} onChange={this.handleStereoPhase} />
            <div className="effectsInfo">Phase</div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Phaser;

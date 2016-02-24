var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');

var Effects = React.createClass({
  getInitialState: function() {
    return {valueDelayFeedBack:50, valueDelayTime : 10, valueReveb: 80  };
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
  render: function (){

    return(
      <div className="trackAudioEffectsPanel">
        <div className="delayAndReverbContainer">
          <div className="delayDiv">
              <div className="buttonsInsideTrack"> DELAY  Status:ON </div>
              <div className="sliderHorizontal">
                <div className="effectsInfo">feedback: {this.state.valueDelayFeedBack}x</div>
                <div className="slider">
                  <Rcslider className="slider" value={this.state.valueDelayFeedBack} onChange={this.handleDelayFeedBack}/>
                </div>
              </div>
              <div className="sliderHorizontal">
                <div className="effectsInfo">delay: {this.state.valueDelayTime}ms</div>
                  <div className="slider">
                    <Rcslider className="slider" value={this.state.valueDelayTime} onChange={this.handleDelayTime}/>
                  </div>
              </div>
          </div>
          <div className="reverbDiv">
              <div className="buttonsInsideTrack"> REVERB  Status:ON </div>
              <div className="sliderHorizontal">
                <div className="effectsInfo">reverb: {this.state.valueReveb}%</div>
                  <div className="slider">
                    <Rcslider className="slider" value={this.state.valueReveb} onChange={this.handleReverb}/>
                  </div>
              </div>
          </div>
        </div>
      </div>

    )
  }


});

module.exports = Effects;

var React = require('react');
var ReactDOM = require('react-dom');


var Volume = React.createClass({
  propTypes: {
    onClick : React.PropTypes.func
  },
  getInitialState: function(){
    this.power = false;
    return({volume:50, buttonClass:"buttonsInsideTrack"});
  },
  handleVolume: function(e){
    if(this.wavesurfer){
      this.wavesurfer.setVolume(e.target.value/100);
      this.setState({volume: e.target.value});
    }
  },
  setWaveform: function(param){
    this.wavesurfer = param;
  },
  handleClick: function(){
    if(!this.wavesurfer){
      this.props.statusError();
      return;
    }
    this.wavesurfer.setVolume(50/100);
    this.setState({volume: 50});

  },

  render: function(){

    return(
      <div className='volumeHolder'>
        <div className="delayTitle">
          <div className={this.state.buttonClass} onClick={this.handleClick}> VOLUME </div>
        </div>
        <div className="reverbDiv">
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.volume}%</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.volume} onChange={this.handleVolume} />
            <div className="effectsInfo">Volume</div>
          </div>

        </div>
      </div>

    );
  }

});

module.exports = Volume;

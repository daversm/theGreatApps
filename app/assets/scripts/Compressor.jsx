var React = require('react');
var ReactDOM = require('react-dom');
var Tangle = require('./tangle.js');

var Compressor = React.createClass({
  getInitialState: function(){
    return({knee:5, makeup:1, attack:1, release:0, ratio:4, threshold:0});
  },
  handleKnee:function(value){
    this.compressor.knee = value;
    this.setState({knee: value});
  },
  handleMakeup:function(value){
    this.compressor.makeupGain = value;
    this.setState({makeup: value});
  },
  handleAttack:function(value){
    this.compressor.attack = value;
    this.setState({attack: value});
  },
  handleRelease:function(value){
    this.compressor.relase = value;
    this.setState({release: value});
  },
  handleRatio:function(value){
    this.compressor.ratio = value;
    this.setState({ratio: value});
  },
  handleThreshold:function(value){
    this.compressor.threshold = value;
    this.setState({threshold: value});
  },
  setWaveform: function(param){
    console.log('wavesurfer set delay');
    this.wavesurfer = param;
  },
  OnOff: function(){
    this.props.list.push(this.compressor);
    /*
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
    */
  },
  handleClick: function(){
    this.props.onClick('Compressor');
  },
  setTuna: function(param){
    this.tuna = param;

    this.compressor = new this.tuna.Compressor({
      threshold: -5,    //-100 to 0
      makeupGain: 5,     //0 and up
      attack: 1,         //0 to 1000
      release: 0,        //0 to 3000
      ratio: 4,          //1 to 20
      knee: 5,           //0 to 40
      automakeup: true,  //true/false
      bypass: 0
    });

  },
  render:function(){
    return(
      <div className="compressorHolder">
        <div className="compressorTitle">
          <div className="buttonsInsideTrack" onClick={this.handleClick}> COMPRESSOR </div>
        </div>
      <div className="compressorDiv">
        <div className="compressorRow">
          <div className="compressorName">
            Knee :
            <Tangle
              value={this.state.knee}
              min={0}
              max={40}
              onChange={this.handleKnee}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Ratio :
            <Tangle
              min={1}
              max={20}
              value={this.state.ratio}
              onChange={this.handleRatio}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Threshold:
            <Tangle
              min={-60}
              max={0}
              value={this.state.threshold}
              onChange={this.handleThreshold}
              className="tangleInput"
            />
          </div>
        </div>
        <div className="compressorRow">
          <div className="compressorName">
            Attack :
            <Tangle
              min={0}
              max={1000}
              value={this.state.attack}
              onChange={this.handleAttack}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Release :
            <Tangle
              min={0}
              max={3000}
              value={this.state.release}
              onChange={this.handleRelease}
              className="tangleInput"
            />
          </div>
          <div className="compressorName">
            Makeup :
            <Tangle
              min={0}
              max={20}
              value={this.state.makeup}
              onChange={this.handleMakeup}
              className="tangleInput"
            />
          </div>
        </div>
      </div>
      </div>
    );
  }

});

module.exports = Compressor;

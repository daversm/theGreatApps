var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var vSlider = require('vertical-rc-slider');


var EQ = React.createClass({
  getInitialState:function(){
    return({valueBandOne:0, valueBandTwo:50, valueBandThree:50, valueBandFour:50,
           valueBandFive:50, valueBandSix:50, valueBandSeven:50, valueBandEight:50, valueSlider: 50
    });
  },
  handleBandOne: function(e){
    this.setState({valueBandOne:e.target.value});
  },
  handleBandTwo: function(value){
    this.setState({valueBandTwo:value});
  },
  handleBandThree: function(value){
    this.setState({valueBandThree:value});
  },
  handleBandFour: function(value){
    this.setState({valueBandFour:value});
  },
  handleBandFive: function(value){
    this.setState({valueBandFive:value});
  },
  handleSlider: function(e){
    this.setState({valueSlider:e.target.value});
  },
  handleSlider: function(e){
    this.setState({valueSlider:e.target.value});
  },
  handleSlider: function(e){
    this.setState({valueSlider:e.target.value});
  },
  render: function(){
    return(
      <div className="EQdiv">

        <div className="EQtitle">
          <div className="buttonsInsideTrack"> EQ 5-BAND </div>
        </div>

        <div className="eqHolder">
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='-12' max='12' value={this.state.valueBandOne} onChange={this.handleBandOne} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleBandTwo} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleBandThree} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueSlider} onChange={this.handleSlider} />
            <div className="effectsInfo">khz</div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = EQ;

var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var vSlider = require('vertical-rc-slider');


var EQ = React.createClass({
  getInitialState:function(){
    return({valueBandOne:50, valueBandTwo:50, valueBandThree:50, valueBandFour:50,
           valueBandFive:50, valueBandSix:50, valueBandSeven:50, valueBandEight:50
    });
  },
  handleBandOne: function(value){
    this.setState({valueBandOne:value});
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
  render: function(){
    return(
      <div className="EQdiv">
        <div className="EQtitle">
          <div className="buttonsInsideTrack"> EQ 5-BAND </div>
        </div>
          <div className="eqHolder">
            <div className="sliderHorizontalEQ">
              <div className="effectsInfo">khz</div>
              <div className="sliderEQ">
                <Rcslider value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
            </div>
            <div className="sliderHorizontalEQ">
              <div className="effectsInfo">khz</div>
              <div className="sliderEQ">
                <Rcslider  value={this.state.valueBandTwo} onChange={this.handleBandTwo}/>
              </div>
              <div className="effectsInfo">{this.state.valueBandTwo}db</div>
            </div>
            <div className="sliderHorizontalEQ">
              <div className="effectsInfo">khz</div>
              <div className="sliderEQ">
                <Rcslider  value={this.state.valueBandThree} onChange={this.handleBandThree}/>
              </div>
              <div className="effectsInfo">{this.state.valueBandThree}db</div>
            </div>
            <div className="sliderHorizontalEQ">
              <div className="effectsInfo">khz</div>
              <div className="sliderEQ">
                <Rcslider  value={this.state.valueBandFour} onChange={this.handleBandFour}/>
              </div>
              <div className="effectsInfo">{this.state.valueBandFour}db</div>
            </div>
            <div className="sliderHorizontalEQ">
              <div className="effectsInfo">khz</div>
              <div className="sliderEQ">
                <Rcslider  value={this.state.valueBandFive} onChange={this.handleBandFive}/>
              </div>
              <div className="effectsInfo">{this.state.valueBandFive}db</div>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = EQ;

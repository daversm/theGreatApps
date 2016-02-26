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
  handleBand32: function(e){
    this.setState({valueBandOne:e.target.value});
  },
  handleBand64: function(e){
    this.setState({valueBandTwo:e.target.value});
  },
  handleBand125: function(e){
    this.setState({valueBandThree:e.target.value});
  },
  handleBand250: function(e){
    this.setState({valueBandFour:e.target.value});
  },
  handleBand500: function(e){
    this.setState({valueBandFive:e.target.value});
  },
  handleBand1000: function(e){
    this.setState({valueBandSix:e.target.value});
  },
  handleBand2000: function(e){
    this.setState({valueBandSeven:e.target.value});
  },
  handleBand4000: function(e){
    this.setState({valueBandEight:e.target.value});
  },
  handleBand8000: function(e){
    this.setState({valueBandNine:e.target.value});
  },
  handleBand16000: function(e){
    this.setState({valueBandTen:e.target.value});
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
            <input className="sliderSizeVertical" type="range" min='-12' max='12' value={this.state.valueBandOne} onChange={this.handleBand32} />
            <div className="effectsInfo">32hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandTwo}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandTwo} onChange={this.handleBand64} />
            <div className="effectsInfo">64hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandThree}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandThree} onChange={this.handleBand125} />
            <div className="effectsInfo">125hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandFour}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandFour} onChange={this.handleBand250} />
            <div className="effectsInfo">250hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandFive}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandFive} onChange={this.handleBand500} />
            <div className="effectsInfo">500hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandSix}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandSix} onChange={this.handleBand1000} />
            <div className="effectsInfo">1khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandSeven}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandSeven} onChange={this.handleBand2000} />
            <div className="effectsInfo">2khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandEight}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandEight} onChange={this.handleBand4000} />
            <div className="effectsInfo">4khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandNine}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandNine} onChange={this.handleBand8000} />
            <div className="effectsInfo">8khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandTen}db</div>
            <input className="sliderSizeVertical" type="range" min='0' max='100' value={this.state.valueBandTen} onChange={this.handleBand16000} />
            <div className="effectsInfo">16khz</div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = EQ;

var React = require('react');
var ReactDOM = require('react-dom');
var RcsliderVertical = require('vertical-rc-slider');

var EQ = React.createClass({
  getInitialState:function(){
    return({valueBandOne:50, valueBandTwo:50, valueBandThree:50, valueBandFour:50,
           valueBandFive:50, valueBandSix:50, valueBandSeven:50, valueBandEight:50
    });
  },
  handleBandOne: function(value){
    this.setState({valueBandOne:value});
  },
  render: function(){
    return(
      <div className="EQdiv">
        <div className="EQtitle">
          <div className="buttonsInsideTrack"> EQ 7-BAND </div>
        </div>
          <div className="eqHolder">
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical tipFormatter={null}  value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
            <div className="sliderVertical">
              <div className="effectsInfo">{this.state.valueBandOne}db</div>
              <div className="sliderVerticalSize">
                <RcsliderVertical value={this.state.valueBandOne} onChange={this.handleBandOne}/>
              </div>
              <div className="effectsInfo">khz</div>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = EQ;

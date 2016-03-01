var React = require('react');
var ReactDOM = require('react-dom');


var EQ = React.createClass({
  getInitialState:function(){
    return({valueBandOne:0, valueBandTwo:0, valueBandThree:0, valueBandFour:0,
           valueBandFive:0, valueBandSix:0, valueBandSeven:0, valueBandEight:0,
           valueBandNine: 0, valueBandTen:0
    });
  },
  componentDidMount: function(){
    this.power = false;
    this.EQ = [
      {
        f: 32,
        type: 'lowshelf'
      }, {
        f: 64,
        type: 'peaking'
      }, {
        f: 125,
        type: 'peaking'
      }, {
        f: 250,
        type: 'peaking'
      }, {
        f: 500,
        type: 'peaking'
      }, {
        f: 1000,
        type: 'peaking'
      }, {
        f: 2000,
        type: 'peaking'
      }, {
        f: 4000,
        type: 'peaking'
      }, {
        f: 8000,
        type: 'peaking'
      }, {
        f: 16000,
        type: 'highshelf'
      }
    ];

  },
  setWaveform: function(params){
    this.wavesurfer = params;
    var thisOutside = this;
    this.filters = this.EQ.map(function (band) {
       var filter = thisOutside.wavesurfer.backend.ac.createBiquadFilter();
       filter.type = band.type;
       filter.gain.value = 0;
       filter.Q.value = 1;
       filter.frequency.value = band.f;
       return filter;
    });
  },
  handleBand32: function(e){
    this.filters[0].gain.value = e.target.value;
    this.setState({valueBandOne:e.target.value});
  },
  handleBand64: function(e){
    this.filters[1].gain.value = e.target.value;
    this.setState({valueBandTwo:e.target.value});
  },
  handleBand125: function(e){
    this.filters[2].gain.value = e.target.value;
    this.setState({valueBandThree:e.target.value});
  },
  handleBand250: function(e){
    this.filters[3].gain.value = e.target.value;
    this.setState({valueBandFour:e.target.value});
  },
  handleBand500: function(e){
    this.filters[4].gain.value = e.target.value;
    this.setState({valueBandFive:e.target.value});
  },
  handleBand1000: function(e){
    this.filters[5].gain.value = e.target.value;
    this.setState({valueBandSix:e.target.value});
  },
  handleBand2000: function(e){
    this.filters[6].gain.value = e.target.value;
    this.setState({valueBandSeven:e.target.value});
  },
  handleBand4000: function(e){
    this.filters[7].gain.value = e.target.value;
    this.setState({valueBandEight:e.target.value});
  },
  handleBand8000: function(e){
    this.filters[8].gain.value = e.target.value;
    this.setState({valueBandNine:e.target.value});
  },
  handleBand16000: function(e){
    this.filters[9].gain.value = e.target.value;
    this.setState({valueBandTen:e.target.value});
  },
  OnOffEq: function(){
    console.log(this.filters);
    if(this.power){
      console.log('now off');
      this.wavesurfer.backend.disconnectFilters();
      this.power = false;
    }else{
      console.log('now on');
      this.wavesurfer.backend.setFilters(this.filters);
      this.power = true;
    }
  },
  render: function(){
    return(
      <div className="EQdiv">

        <div className="EQtitle">
          <div className="buttonsInsideTrack" onClick={this.OnOffEq}> EQ 10-BAND </div>
        </div>

        <div className="eqHolder">
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandOne}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandOne} onChange={this.handleBand32} />
            <div className="effectsInfo">32hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandTwo}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandTwo} onChange={this.handleBand64} />
            <div className="effectsInfo">64hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandThree}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandThree} onChange={this.handleBand125} />
            <div className="effectsInfo">125hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandFour}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandFour} onChange={this.handleBand250} />
            <div className="effectsInfo">250hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandFive}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandFive} onChange={this.handleBand500} />
            <div className="effectsInfo">500hz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandSix}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandSix} onChange={this.handleBand1000} />
            <div className="effectsInfo">1khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandSeven}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandSeven} onChange={this.handleBand2000} />
            <div className="effectsInfo">2khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandEight}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandEight} onChange={this.handleBand4000} />
            <div className="effectsInfo">4khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandNine}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandNine} onChange={this.handleBand8000} />
            <div className="effectsInfo">8khz</div>
          </div>
          <div className="sliderVertical">
            <div className="effectsInfo">{this.state.valueBandTen}db</div>
            <input className="sliderSizeVertical" type="range" min='-30' max='30' value={this.state.valueBandTen} onChange={this.handleBand16000} />
            <div className="effectsInfo">16khz</div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = EQ;

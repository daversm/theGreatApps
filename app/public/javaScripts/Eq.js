'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var vSlider = require('vertical-rc-slider');

var EQ = React.createClass({
  displayName: 'EQ',

  getInitialState: function getInitialState() {
    return { valueBandOne: 0, valueBandTwo: 50, valueBandThree: 50, valueBandFour: 50,
      valueBandFive: 50, valueBandSix: 50, valueBandSeven: 50, valueBandEight: 50, valueSlider: 50
    };
  },
  handleBand32: function handleBand32(e) {
    this.setState({ valueBandOne: e.target.value });
  },
  handleBand64: function handleBand64(e) {
    this.setState({ valueBandTwo: e.target.value });
  },
  handleBand125: function handleBand125(e) {
    this.setState({ valueBandThree: e.target.value });
  },
  handleBand250: function handleBand250(e) {
    this.setState({ valueBandFour: e.target.value });
  },
  handleBand500: function handleBand500(e) {
    this.setState({ valueBandFive: e.target.value });
  },
  handleBand1000: function handleBand1000(e) {
    this.setState({ valueBandSix: e.target.value });
  },
  handleBand2000: function handleBand2000(e) {
    this.setState({ valueBandSeven: e.target.value });
  },
  handleBand4000: function handleBand4000(e) {
    this.setState({ valueBandEight: e.target.value });
  },
  handleBand8000: function handleBand8000(e) {
    this.setState({ valueBandNine: e.target.value });
  },
  handleBand16000: function handleBand16000(e) {
    this.setState({ valueBandTen: e.target.value });
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'EQdiv' },
      React.createElement(
        'div',
        { className: 'EQtitle' },
        React.createElement(
          'div',
          { className: 'buttonsInsideTrack' },
          ' EQ 5-BAND '
        )
      ),
      React.createElement(
        'div',
        { className: 'eqHolder' },
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '-12', max: '12', value: this.state.valueBandOne, onChange: this.handleBand32 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '32hz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandTwo,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandTwo, onChange: this.handleBand64 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '64hz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandThree,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandThree, onChange: this.handleBand125 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '125hz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandFour,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandFour, onChange: this.handleBand250 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '250hz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandFive,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandFive, onChange: this.handleBand500 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '500hz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandSix,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandSix, onChange: this.handleBand1000 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '1khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandSeven,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandSeven, onChange: this.handleBand2000 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '2khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandEight,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandEight, onChange: this.handleBand4000 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '4khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandNine,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandNine, onChange: this.handleBand8000 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '8khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandTen,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueBandTen, onChange: this.handleBand16000 }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            '16khz'
          )
        )
      )
    );
  }
});

module.exports = EQ;
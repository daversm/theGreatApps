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
  handleBandOne: function handleBandOne(e) {
    this.setState({ valueBandOne: e.target.value });
  },
  handleBandTwo: function handleBandTwo(value) {
    this.setState({ valueBandTwo: value });
  },
  handleBandThree: function handleBandThree(value) {
    this.setState({ valueBandThree: value });
  },
  handleBandFour: function handleBandFour(value) {
    this.setState({ valueBandFour: value });
  },
  handleBandFive: function handleBandFive(value) {
    this.setState({ valueBandFive: value });
  },
  handleSlider: function handleSlider(e) {
    this.setState({ valueSlider: e.target.value });
  },
  handleSlider: function handleSlider(e) {
    this.setState({ valueSlider: e.target.value });
  },
  handleSlider: function handleSlider(e) {
    this.setState({ valueSlider: e.target.value });
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
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '-12', max: '12', value: this.state.valueBandOne, onChange: this.handleBandOne }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleBandTwo }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleBandThree }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderVertical' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          ),
          React.createElement('input', { className: 'sliderSizeVertical', type: 'range', min: '0', max: '100', value: this.state.valueSlider, onChange: this.handleSlider }),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          )
        )
      )
    );
  }
});

module.exports = EQ;
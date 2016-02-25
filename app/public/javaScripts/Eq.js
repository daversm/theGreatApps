'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var vSlider = require('vertical-rc-slider');

var EQ = React.createClass({
  displayName: 'EQ',

  getInitialState: function getInitialState() {
    return { valueBandOne: 50, valueBandTwo: 50, valueBandThree: 50, valueBandFour: 50,
      valueBandFive: 50, valueBandSix: 50, valueBandSeven: 50, valueBandEight: 50
    };
  },
  handleBandOne: function handleBandOne(value) {
    this.setState({ valueBandOne: value });
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
          { className: 'sliderHorizontalEQ' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          ),
          React.createElement(
            'div',
            { className: 'sliderEQ' },
            React.createElement(Rcslider, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandOne,
            'db'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderHorizontalEQ' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          ),
          React.createElement(
            'div',
            { className: 'sliderEQ' },
            React.createElement(Rcslider, { value: this.state.valueBandTwo, onChange: this.handleBandTwo })
          ),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandTwo,
            'db'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderHorizontalEQ' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          ),
          React.createElement(
            'div',
            { className: 'sliderEQ' },
            React.createElement(Rcslider, { value: this.state.valueBandThree, onChange: this.handleBandThree })
          ),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandThree,
            'db'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderHorizontalEQ' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          ),
          React.createElement(
            'div',
            { className: 'sliderEQ' },
            React.createElement(Rcslider, { value: this.state.valueBandFour, onChange: this.handleBandFour })
          ),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandFour,
            'db'
          )
        ),
        React.createElement(
          'div',
          { className: 'sliderHorizontalEQ' },
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            'khz'
          ),
          React.createElement(
            'div',
            { className: 'sliderEQ' },
            React.createElement(Rcslider, { value: this.state.valueBandFive, onChange: this.handleBandFive })
          ),
          React.createElement(
            'div',
            { className: 'effectsInfo' },
            this.state.valueBandFive,
            'db'
          )
        )
      )
    );
  }
});

module.exports = EQ;
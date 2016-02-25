'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var RcsliderVertical = require('vertical-rc-slider');

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
          ' EQ 7-BAND '
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { tipFormatter: null, value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
          React.createElement(
            'div',
            { className: 'sliderVerticalSize' },
            React.createElement(RcsliderVertical, { value: this.state.valueBandOne, onChange: this.handleBandOne })
          ),
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
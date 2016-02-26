'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Rcslider = require('rc-slider');
var EQ = require('./EQ');
var knob = require('react-knob');

var Effects = React.createClass({
  displayName: 'Effects',

  getInitialState: function getInitialState() {
    return { valueDelayFeedBack: 50, valueDelayTime: 10, valueReveb: 80, valueEQ: 50 };
  },
  handleDelayFeedBack: function handleDelayFeedBack(value) {
    reverb.gainNode.gain.value = value / 100;
    this.setState({
      valueDelayFeedBack: value
    });
  },
  handleDelayTime: function handleDelayTime(value) {
    //reverb.gainNode.gain.value = value/100;
    this.setState({
      valueDelayTime: value
    });
  },
  handleReverb: function handleReverb(value) {
    //reverb.gainNode.gain.value = value/100;
    this.setState({
      valueReveb: value
    });
  },
  handleEQ: function handleEQ(e) {
    console.log(e.target.frq);
    this.setState({
      valueEQ: e.target.value
    });
  },
  render: function render() {

    return React.createElement('div', { className: 'trackAudioEffectsPanel' }, React.createElement('div', { className: 'delayAndReverbContainer' }, React.createElement('div', { className: 'delayDiv' }, React.createElement('div', { className: 'buttonsInsideTrack' }, ' DELAY '), React.createElement('div', { className: 'sliderHorizontal' }, React.createElement('div', { className: 'effectsInfo' }, 'feedback: ', this.state.valueDelayFeedBack, 'x'), React.createElement('div', { className: 'slider' }, React.createElement(Rcslider, { value: this.state.valueDelayFeedBack, onChange: this.handleDelayFeedBack }))), React.createElement('div', { className: 'sliderHorizontal' }, React.createElement('div', { className: 'effectsInfo' }, 'delay: ', this.state.valueDelayTime, 'ms'), React.createElement('div', { className: 'slider' }, React.createElement(Rcslider, { value: this.state.valueDelayTime, onChange: this.handleDelayTime })))), React.createElement('div', { className: 'reverbDiv' }, React.createElement('div', { className: 'buttonsInsideTrack' }, ' REVERB '), React.createElement('div', { className: 'sliderHorizontal' }, React.createElement('div', { className: 'effectsInfo' }, 'reverb: ', this.state.valueReveb, '%'), React.createElement('div', { className: 'slider' }, React.createElement(Rcslider, { value: this.state.valueReveb, onChange: this.handleReverb }))))), React.createElement(EQ, null), React.createElement('knob', null));
  }

});

module.exports = Effects;
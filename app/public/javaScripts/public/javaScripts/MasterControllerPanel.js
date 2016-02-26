'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Track = require('./Track.js');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var MasterController = _react2.default.createClass({
  displayName: 'MasterController',

  getInitialState: function getInitialState() {
    return { micSwitchState: false,
      tracksArray: [{ trackName: "track1", tracksTitle: "TRACK 1" }, { trackName: "track2", tracksTitle: "TRACK 2" }, { trackName: "track3", tracksTitle: "TRACK 3" }]
    };
  },
  componentDidMount: function componentDidMount() {
    var outerThis = this;
    navigator.getUserMedia({ audio: true }, function (localMediaStream) {
      mediaStream = localMediaStream;
      mediaStreamSource = contextForRec.createMediaStreamSource(mediaStream);
      masterMicStatus = true;
      outerThis.refs['track1'].setMicToRecorder();
      outerThis.refs['track2'].setMicToRecorder();
      outerThis.refs['track3'].setMicToRecorder();
    }, function (err) {
      console.log('Browser not supported');
    });
  },
  handleMasterPlay: function handleMasterPlay() {
    this.refs['track1'].handlePlay();
    this.refs['track2'].handlePlay();
    this.refs['track3'].handlePlay();
  },
  handleMasterStopRecord: function handleMasterStopRecord() {
    this.refs['track1'].handleRecStop();
    this.refs['track2'].handleRecStop();
    this.refs['track3'].handleRecStop();
  },
  handleMasterRecord: function handleMasterRecord() {
    this.refs['track1'].handleRecord();
    this.refs['track2'].handleRecord();
    this.refs['track3'].handleRecord();
  },
  handleMasterPause: function handleMasterPause() {
    this.refs['track1'].handlePause();
    this.refs['track2'].handlePause();
    this.refs['track3'].handlePause();
  },
  handleMasterStop: function handleMasterStop() {
    this.refs['track1'].handleStop();
    this.refs['track2'].handleStop();
    this.refs['track3'].handleStop();
  },

  render: function render() {
    var trackListItems = this.state.tracksArray.map(function (trackData) {
      return _react2.default.createElement(_Track.Track, {
        ref: trackData.trackName,
        key: trackData.trackName,
        trackName: trackData.trackName,
        trackTitle: trackData.tracksTitle
      });
    });

    return _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'masterControllPanel' }, _react2.default.createElement('div', { className: 'masterControllPanelControls' }, _react2.default.createElement('div', { id: 'playMaster', onClick: this.handleMasterPlay }), _react2.default.createElement('div', { id: 'pauseMaster', onClick: this.handleMasterPause }), _react2.default.createElement('div', { id: 'stopMaster', onClick: this.handleMasterStop }), _react2.default.createElement('div', { id: 'rec', onClick: this.handleMasterRecord }), _react2.default.createElement('div', { id: 'recStopMaster', onClick: this.handleMasterStopRecord }))), _react2.default.createElement('div', { id: 'tracksDiv' }, _react2.default.createElement('div', null, trackListItems)));
  }
});

(0, _reactDom.render)(_react2.default.createElement(MasterController, null), document.getElementById('masterContainer'));
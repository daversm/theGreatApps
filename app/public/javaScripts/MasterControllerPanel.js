'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Track = require('./Track.js');

var MasterController = React.createClass({
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
      return React.createElement(Track, {
        ref: trackData.trackName,
        key: trackData.trackName,
        trackName: trackData.trackName,
        trackTitle: trackData.tracksTitle
      });
    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'masterControllPanel' },
        React.createElement(
          'div',
          { className: 'masterControllPanelControls' },
          React.createElement('div', { id: 'playMaster', onClick: this.handleMasterPlay }),
          React.createElement('div', { id: 'pauseMaster', onClick: this.handleMasterPause }),
          React.createElement('div', { id: 'stopMaster', onClick: this.handleMasterStop }),
          React.createElement('div', { id: 'rec', onClick: this.handleMasterRecord }),
          React.createElement('div', { id: 'recStopMaster', onClick: this.handleMasterStopRecord })
        )
      ),
      React.createElement(
        'div',
        { id: 'tracksDiv' },
        React.createElement(
          'div',
          null,
          trackListItems
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(MasterController, null), document.getElementById('masterContainer'));
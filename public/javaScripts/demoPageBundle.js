(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Track = React.createClass({
  displayName: 'Track',

  getInitialState: function getInitialState() {
    return { trackStatusMsg: 'MIC OFF' };
  },
  setMicToRecorder: function setMicToRecorder() {
    this.rec = new Recorder(mediaStreamSource, {
      workerPath: '../public/libs/Recorderjs/recorderWorker.js', bufferLen: 8192
    });
    this.trackReady = true;
    this.setState({ trackStatusMsg: 'READY' });
  },
  isRecordingInSession: function isRecordingInSession() {
    if (this.currentlyRecording || this.recordingIsPaused) {
      return { trackStatus: true };
    } else {
      return { trackStatus: false };
    }
  },

  componentDidMount: function componentDidMount() {
    var outerThis = this;
    this.trackReady = false;
    this.enablePlayBackButtons = false;
    this.currentColorMicIcon = "#5A5A5A";
    this.currentlyRecording = false;
    this.recordingIsPaused = false;

    this.waveSurferOn = false;
    this.wavesurfer = Object.create(WaveSurfer);
    this.wavesurfer.init({
      container: "#" + outerThis.props.trackName,
      waveColor: "#5A5A5A",
      interact: false,
      cursorWidth: 0,
      height: 170
    });
    this.microphone = Object.create(WaveSurfer.Microphone);
    this.microphone.init({
      wavesurfer: this.wavesurfer
    });
  },
  handleDeleteAudio: function handleDeleteAudio() {},
  mouseOver: function mouseOver(e) {
    if (this.trackReady == true) {
      e.target.style.color = "#0099FF";
    }
  },
  mouseOut: function mouseOut(e) {
    if (this.trackReady == true) {
      e.target.style.color = this.currentColorMicIcon;
    }
  },
  handleRecord: function handleRecord() {
    var outerThis = this;

    if (this.currentlyRecording == false) {
      this.enablePlayBackButtons = false;
      this.setState({ trackStatusMsg: 'RECORDING' });
      this.microphone.destroy();
      this.wavesurfer.empty();
      this.wavesurfer.destroy();
      this.wavesurfer = Object.create(WaveSurfer);
      this.wavesurfer.init({
        container: "#" + outerThis.props.trackName,
        waveColor: "#5A5A5A",
        interact: false,
        cursorWidth: 0,
        height: 170
      });
      this.microphone = Object.create(WaveSurfer.Microphone);
      this.microphone.init({
        wavesurfer: this.wavesurfer
      });
      this.microphone.gotStream(mediaStream);
      this.currentlyRecording = true;
      this.microphone.play();
      this.rec.record();
      this.recordingIsPaused = false;
    } else {
      this.enablePlayBackButtons = false;
      this.setState({ trackStatusMsg: 'RECORDING PAUSED' });
      this.currentlyRecording = false;
      this.recordingIsPaused = true;
      this.microphone.pause();
      this.rec.stop();
    }
  },
  handleShowWaveLive: function handleShowWaveLive(e) {
    var outerThis = this;
    if (this.currentlyRecording == false) {
      if (this.waveSurferOn == false) {
        this.microphone.destroy();
        this.wavesurfer.empty();
        this.wavesurfer.destroy();
        this.wavesurfer = Object.create(WaveSurfer);
        this.wavesurfer.init({
          container: "#" + outerThis.props.trackName,
          waveColor: "#5A5A5A",
          interact: false,
          cursorWidth: 0,
          height: 170
        });
        this.microphone = Object.create(WaveSurfer.Microphone);
        this.microphone.init({
          wavesurfer: this.wavesurfer
        });
        this.microphone.gotStream(mediaStream);
        this.microphone.play();
        e.target.style.color = "#FF4D1D";
        this.currentColorMicIcon = "#FF4D1D";
        this.waveSurferOn = true;
      } else {
        this.microphone.pause();
        e.target.style.color = "#5A5A5A";
        this.currentColorMicIcon = "#5A5A5A";
        this.waveSurferOn = false;
      }
    }
  },
  handleLiveFeed: function handleLiveFeed() {},
  handleDownloadTrack: function handleDownloadTrack() {
    var outerThis = this;
    this.rec.exportWAV(function (e) {
      outerThis.rec.clear();
      Recorder.forceDownload(e, "filename.wav");
    });
  },
  handleRecStop: function handleRecStop() {
    if (this.currentlyRecording || this.recordingIsPaused) {

      this.setState({ trackStatusMsg: "LOADING AUDIO" }, function () {
        console.log(this.state.trackStatusMsg);
      });

      console.log(this.state.trackStatusMsg);

      this.currentlyRecording = false;
      this.recordingIsPaused = false;
      this.microphone.pause();
      this.rec.stop();
      this.microphone.destroy();
      this.wavesurfer.empty();
      this.wavesurfer.destroy();

      this.wavesurferPostRecording = Object.create(WaveSurfer);
      var outerThis2 = this;

      this.wavesurferPostRecording.init({
        container: "#" + outerThis2.props.trackName,
        waveColor: '#0099FF',
        progressColor: '#5A5A5A',
        interact: true,
        cursorWidth: 3,
        cursorColor: '#FF6D45',
        height: 170
      });
      this.wavesurferPostRecording.on('ready', function () {
        outerThis2.timeline = Object.create(WaveSurfer.Timeline);
        outerThis2.timeline.init({
          wavesurfer: outerThis2.wavesurferPostRecording,
          container: "#" + outerThis2.props.trackName,
          primaryColor: '#5A5A5A',
          secondaryColor: '#5A5A5A',
          primaryFontColor: '#5A5A5A',
          height: 40
        });
      });

      var outerThis2 = this;
      this.rec.getBuffer(function (buffers) {
        var newSource = audioContext.createBufferSource();
        var newBuffer = audioContext.createBuffer(2, buffers[0].length, audioContext.sampleRate);
        newBuffer.getChannelData(0).set(buffers[0]);
        newBuffer.getChannelData(1).set(buffers[1]);
        newSource.buffer = newBuffer;

        newSource.connect(audioContext.destination);
        newSource.start(0);
      });

      this.rec.exportWAV(function (audio) {
        var blob = new Blob([audio]);
        outerThis2.wavesurferPostRecording.loadBlob(blob);
        outerThis2.setState({ trackStatusMsg: "RECORDING DONE" });
      });

      this.enablePlayBackButtons = true;
    }
  },
  handlePlay: function handlePlay() {
    if (!this.currentlyRecording && !this.recordingIsPaused && this.enablePlayBackButtons) {
      this.wavesurferPostRecording.play();
    }
  },
  handleStop: function handleStop() {
    if (!this.currentlyRecording && !this.recordingIsPaused && this.enablePlayBackButtons) {
      this.wavesurferPostRecording.stop();
    }
  },
  handlePause: function handlePause() {
    if (!this.currentlyRecording && !this.recordingIsPaused && this.enablePlayBackButtons) {
      this.wavesurferPostRecording.pause();
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'trackMasterPanel' },
        React.createElement(
          'div',
          { className: 'trackInfoPanel' },
          React.createElement(
            'div',
            { className: 'trackName' },
            ' ',
            this.props.trackTitle,
            ' '
          ),
          React.createElement(
            'div',
            { className: 'buttonsInsideTrack', onClick: this.handleShowWaveLive },
            ' Show Wave '
          ),
          React.createElement(
            'div',
            { className: 'buttonsInsideTrack' },
            ' Mute '
          ),
          React.createElement(
            'div',
            { className: 'buttonsInsideTrack' },
            ' Solo '
          ),
          React.createElement(
            'div',
            { className: 'buttonsInsideTrack' },
            ' Delete Audio '
          )
        ),
        React.createElement(
          'div',
          { className: 'containerTrackDiv' },
          React.createElement(
            'div',
            { className: 'playbackRecordingDiv' },
            React.createElement(
              'div',
              { className: 'playbackOptionsDiv' },
              React.createElement('div', { id: 'play', onClick: this.handlePlay }),
              React.createElement('div', { id: 'stop', onClick: this.handleStop }),
              React.createElement('div', { id: 'pause', onClick: this.handlePause })
            ),
            React.createElement(
              'div',
              { className: 'recordingOptionsDiv' },
              React.createElement('div', { id: 'recTrack', onClick: this.handleRecord }),
              React.createElement('div', { id: 'recStop', onClick: this.handleRecStop }),
              React.createElement('div', { className: 'icono-headphone', onClick: this.handleDownloadTrack })
            )
          ),
          React.createElement(
            'div',
            { id: this.props.trackName, className: 'waveformContainerDiv' },
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'trackStatusPanel' },
          React.createElement(
            'div',
            { className: 'trackStatusMsg' },
            ' ',
            this.state.trackStatusMsg,
            ' '
          )
        )
      ),
      React.createElement('br', null)
    );
  }
});

module.exports = Track;
},{}],2:[function(require,module,exports){
"use strict";

var Track = require('./Track.js');

var MasterController = React.createClass({
  displayName: "MasterController",

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
      "div",
      null,
      React.createElement(
        "div",
        { className: "masterControllPanel" },
        React.createElement(
          "div",
          { className: "masterControllPanelControls" },
          React.createElement("div", { id: "playMaster", onClick: this.handleMasterPlay }),
          React.createElement("div", { id: "pauseMaster", onClick: this.handleMasterPause }),
          React.createElement("div", { id: "stopMaster", onClick: this.handleMasterStop }),
          React.createElement("div", { id: "rec", onClick: this.handleMasterRecord }),
          React.createElement("div", { id: "recStopMaster", onClick: this.handleMasterStopRecord })
        )
      ),
      React.createElement(
        "div",
        { id: "tracksDiv" },
        React.createElement(
          "div",
          null,
          trackListItems
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(MasterController, null), document.getElementById('masterContainer'));
},{"./Track.js":1}]},{},[2]);

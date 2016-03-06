var React = require('react');
var ReactDOM = require('react-dom');
var Recorder = require('recorderjs');
var jQuery = require('jquery');
var Effects = require('./Effects.jsx');
var Tuna = require('tunajs');


export var Track = React.createClass({
  getInitialState: function() {
    return {value:50, style:{background:'#6F6F6F'}};
  },
  setMicToRecorder: function(){
    this.rec = new Recorder(mediaStreamSource, {
     workerPath: '../public/libs/Recorderjs/recorderWorker.js', bufferLen: 8192
    });
    this.trackReady = true;
    this.setState({trackStatusMsg: 'READY'});
  },
  isRecordingInSession: function(){
    if(this.currentlyRecording || this.recordingIsPaused){
      return {trackStatus: true};
    }else{
      return {trackStatus: false};
    }
  },

  componentDidMount: function(){
    this.ListItem = React.createClass({
      render: function () {
        return React.createElement('div', {
          className: 'inner',
          style: {
            color: this.props.item.color
          }
        }, this.props.sharedProps ? this.props.sharedProps.prefix : undefined, this.props.item.name);
      }
    });


    var outerThis = this;
    this.trackReady = false;
    this.enablePlayBackButtons = false;
    this.currentColorMicIcon = "#5A5A5A";
    this.currentlyRecording = false;
    this.recordingIsPaused = false;

    this.waveSurferOn = false;
    this.wavesurfer = Object.create(WaveSurfer);
    this.wavesurfer.init({
      container     : "#" + outerThis.props.trackName,
      waveColor     : "#5A5A5A",
      interact      : false,
      cursorWidth   : 0,
      height        : 170
    });
    this.microphone = Object.create(WaveSurfer.Microphone);
    this.microphone.init({
        wavesurfer: this.wavesurfer
    });

  },
  handleDeleteAudio: function(){

  },
  mouseOver: function (e) {
    if(this.trackReady == true){
      e.target.style.color = "#0099FF";
    }
  },
  mouseOut: function (e) {
    if(this.trackReady == true){
      e.target.style.color =  this.currentColorMicIcon;
    }
  },
  handleRecord: function(){
    var outerThis = this;
    this.setState({style:{background:'#FF4D1D'}});

      if(this.currentlyRecording == false){
        this.enablePlayBackButtons = false;
        this.setState({trackStatusMsg:'RECORDING'});
        this.microphone.destroy();
        this.wavesurfer.empty();
        this.wavesurfer.destroy();
        if (typeof this.wavesurferPostRecording != "undefined") {
            this.wavesurferPostRecording.empty();
            this.wavesurferPostRecording.destroy();
        }
        this.wavesurfer = Object.create(WaveSurfer);
        this.wavesurfer.init({
          container     : "#" + outerThis.props.trackName,
          waveColor     : "#5A5A5A",
          interact      : false,
          cursorWidth   : 0,
          height        : 170
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

      }else{
        this.enablePlayBackButtons = false;
        this.setState({trackStatusMsg:'RECORDING PAUSED'});
        this.currentlyRecording = false;
        this.recordingIsPaused = true;
        this.microphone.pause();
        this.rec.stop();

      }

  },
  handleShowWaveLive: function(e){
    var outerThis = this;
    /*
    $.ajax({
      type: 'POST',
      url: '/upload',
      data: outerThis.fd,
      processData: false,
      contentType: false,
      dataType: "script",
      success: function(data) {
        console.log('Uploaded..I think');
      }

    });
    */

    var request = new XMLHttpRequest();
    request.open("GET", "/download", true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      var Data = request.response;
      process(Data);
    };

    request.send();

    function process(Data){
      var blob= new Blob([Data]);
      outerThis.wavesurferPostRecording.empty();
      outerThis.wavesurferPostRecording.loadBlob(blob);
      console.log(Data);
      console.log(Data.size);
    };


  },
  handleLiveFeed: function(){


  },
  handleDownloadTrack: function(){
    var outerThis = this;
    this.rec.exportWAV(function(e){
        outerThis.rec.clear();
        Recorder.forceDownload(e, "filename.wav");
      });

  },
  handleRecStop: function(){
    if(this.currentlyRecording || this.recordingIsPaused){

          this.setState({trackStatusMsg:"LOADING AUDIO"}, function() {
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
              audioContext : audioContext,
              container: "#" + outerThis2.props.trackName,
              waveColor: '#0099FF',
              progressColor: '#5A5A5A',
              interact      : true,
              cursorWidth   : 3,
              cursorColor   : '#FF6D45',
              height        : 170
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

          this.refs['Effects'].setPropsToEffects(this.wavesurferPostRecording);

            var outerThis2 = this;
              this.rec.getBuffer(function(buffers){
                var newSource = audioContext.createBufferSource();
                var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
                newBuffer.getChannelData(0).set(buffers[0]);
                newBuffer.getChannelData(1).set(buffers[1]);
                newSource.buffer = newBuffer;

                newSource.connect( audioContext.destination );
                newSource.start(0);
              });

              this.rec.exportWAV(function(audio){

                outerThis2.fd = new FormData();
                outerThis2.fd.append('data', audio);
                console.log(audio);
                var blob= new Blob([audio]);
                outerThis2.wavesurferPostRecording.loadBlob(blob);
                outerThis2.setState({trackStatusMsg: "RECORDING DONE", style:{background:'#6F6F6F'}});
              });

              this.enablePlayBackButtons = true;


      }

  },
  handlePlay: function(){
    if( !this.currentlyRecording &&
        !this.recordingIsPaused && this.enablePlayBackButtons){
            this.wavesurferPostRecording.play();
    }
  },
  handleStop: function(){
    if( !this.currentlyRecording &&
        !this.recordingIsPaused && this.enablePlayBackButtons){
            this.wavesurferPostRecording.stop();
    }
  },
  handlePause: function(){
    if( !this.currentlyRecording &&
        !this.recordingIsPaused && this.enablePlayBackButtons){
            this.wavesurferPostRecording.pause();
    }

  },


  render: function(){
    return (
      <div>
      <div className="trackMasterPanel">

       <div className="trackInfoPanel">
          <div className="trackName"> {this.props.trackTitle} </div>
          <div className="buttonsInsideTrack" onClick={this.handleShowWaveLive}> Show Wave </div>
          <div className="buttonsInsideTrack"> Mute </div>
          <div className="buttonsInsideTrack"> Solo </div>
          <div className="buttonsInsideTrack" onClick={this.handleDeleteAudio}> Delete Audio </div>

       </div>
        <div className="containerTrackDiv">

          <div className="playbackRecordingDiv">

            <div className="playbackOptionsDiv">
              <div id="play"  onClick={this.handlePlay}></div>
              <div id="stop"  onClick={this.handleStop}></div>
              <div id="pause" onClick={this.handlePause}></div>
            </div>
            <div className="recordingOptionsDiv">
              <div id="recTrack" onClick={this.handleRecord}></div>
              <div id="recStop" onClick={this.handleRecStop}></div>
              <div className="icono-headphone" onClick={this.handleDownloadTrack}></div>

            </div>

          </div>

          <div id={this.props.trackName} className="waveformContainerDiv"> </div>

        </div>
          <div className="trackStatusPanel">
            <div style={this.state.style} className="trackStatusMsg" > {this.state.trackStatusMsg} </div>
          </div>
          <Effects ref="Effects"/>
        </div>

        </div>
    );
  }
});

module.exports.Track = Track;

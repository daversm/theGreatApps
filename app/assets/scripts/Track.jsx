var React = require('react');
var ReactDOM = require('react-dom');
var Recorder = require('recorderjs');
var jQuery = require('jquery');
var Effects = require('./Effects.jsx');
var Tuna = require('tunajs');


export var Track = React.createClass({
  getInitialState: function() {
    return {value:50, style:{background:'#848383'}};
  },
  setMicToRecorder: function(){
    this.rec = new Recorder(mediaStreamSource, { bufferLen: 8192 });
    this.trackReady = true;
    this.setState({trackStatusMsg: 'NO RECORDING'});
  },
  isRecordingInSession: function(){
    if(this.currentlyRecording || this.recordingIsPaused){
      return {trackStatus: true};
    }else{
      return {trackStatus: false};
    }
  },

  componentDidMount: function(){

    var outerThis = this;
    this.fileLoadedOrRecorder = false;
    this.trackReady = false;
    this.enablePlayBackButtons = false;
    this.currentColorMicIcon = "#5A5A5A";
    this.currentlyRecording = false;
    this.recordingIsPaused = false;
    this.regionCreated = false;
    this.currentStatusMsg = {trackStatusMsg: 'NO RECORDING', style:{background:'#848383'}};

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

    this.trackAudioBuffers = [new Float32Array(0), new Float32Array(0)];
    console.log(this.trackAudioBuffers);

  },
  handleDeleteAudio: function(){
    this.fileLoadedOrRecorder = false;

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
            var testOut = outerThis2.wavesurferPostRecording.enableDragSelection();

          });

          this.wavesurferPostRecording.on('region-created', function (region) {

            outerThis2.regionTest = region;
            outerThis2.regionCreated = true;
          });

          this.refs['Effects'].setPropsToEffects(this.wavesurferPostRecording);

            var outerThis2 = this;
              this.rec.getBuffer(function(buffers){

                outerThis2.mergeTrackAudioBuffer(buffers);
                buffers = outerThis2.trackAudioBuffers;
                var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
                newBuffer.getChannelData(0).set(buffers[0]);
                newBuffer.getChannelData(1).set(buffers[1]);
                outerThis2.wavesurferPostRecording.loadDecodedBuffer(newBuffer);
                outerThis2.currentStatusMsg = {trackStatusMsg: "READY", style:{background:'#848383'}};
                outerThis2.setStatusMsg('#31A9F9',"RECORDING DONE", outerThis2.currentStatusMsg);
                outerThis2.enablePlayBackButtons = true;
                outerThis2.rec.clear();
                outerThis2.fileLoadedOrRecorder = true;


              });




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
  handleUndoSelection: function(){
    if(this.fileLoadedOrRecorder == false){
      this.setStatusMsg('#FF4D1D','NO RECORDING!', this.currentStatusMsg);
      return;
    }
    if(this.regionCreated  == false){
      this.setStatusMsg('#FF4D1D','NO REGION!', this.currentStatusMsg);
      return;
    }
    this.wavesurferPostRecording.clearRegions();
    this.regionCreated = false;
  },
  handleLoop: function(){
    if(this.fileLoadedOrRecorder == false){
      this.setStatusMsg('#FF4D1D','NO RECORDING!', this.currentStatusMsg);
      return;
    }
    if(this.regionCreated  == false){
      this.setStatusMsg('#FF4D1D','NO REGION!', this.currentStatusMsg);
      return;
    }
    if(this.regionTest.loop == true){
      this.regionTest.loop = false;
    }else{
      this.regionTest.loop = true;
    }

  },
  handleAudioDeleteOnly: function(){
    if(this.fileLoadedOrRecorder == false){
      this.setStatusMsg('#FF4D1D','NO RECORDING!', this.currentStatusMsg);
      return;
    }
    if(this.regionCreated  == false){
      this.setStatusMsg('#FF4D1D','NO REGION!', this.currentStatusMsg);
      return;
    }

    var outerThis2 = this;
    var startBufferPos = ( this.regionTest.start.toFixed(5) * audioContext.sampleRate).toFixed(0);
    var endBufferPos = ( this.regionTest.end.toFixed(5) * audioContext.sampleRate).toFixed(0);

    if(this.wavesurferPostRecording.isPlaying()){
      this.wavesurferPostRecording.stop();
    }


    var buffers = this.trackAudioBuffers;
    if(endBufferPos > buffers[0].length){
      endBufferPos = buffers[0].length -1 ;
    }
    buffers[0].fill(0,startBufferPos, endBufferPos);
    buffers[1].fill(0,startBufferPos, endBufferPos);


    var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
    newBuffer.getChannelData(0).set(buffers[0]);
    newBuffer.getChannelData(1).set(buffers[1]);
    outerThis2.wavesurferPostRecording.empty();
    outerThis2.wavesurferPostRecording.loadDecodedBuffer(newBuffer);



  },

  handleDeleteRegionAudio: function(){
    if(this.fileLoadedOrRecorder == false){
      this.setStatusMsg('#FF4D1D','NO RECORDING!', this.currentStatusMsg);
      return;
    }
    if(this.regionCreated  == false){
      this.setStatusMsg('#FF4D1D','NO REGION!', this.currentStatusMsg);
      return;
    }

      function Float32Concat(first, second){
        var firstLength = first.length,
            result = new Float32Array(firstLength + second.length);

        result.set(first);
        result.set(second, firstLength);

        return result;
      }


      var outerThis2 = this;
    //console.log(this.regionTest);
    //console.log(this.regionTest.start);
    //console.log(this.regionTest.end);

      var startBufferPos = ( this.regionTest.start.toFixed(5) * audioContext.sampleRate).toFixed(0);
      var endBufferPos = ( this.regionTest.end.toFixed(5) * audioContext.sampleRate).toFixed(0);
    //console.log("startBufferPos : " + startBufferPos);
    //console.log("endBufferPos : " + endBufferPos);
      if(this.wavesurferPostRecording.isPlaying()){
        this.wavesurferPostRecording.stop();
      }


      var buffers = this.trackAudioBuffers;


      var RightCh = buffers[0];
      var LeftCh = buffers[1];

      var startNewBufferR = RightCh.slice(0, startBufferPos);
      var startNewBufferL = LeftCh.slice(0, startBufferPos);
        //console.log(startNewBufferR);
        //console.log(Array.isArray(startNewBufferR));
        //console.log(startNewBufferL);

      var endNewBufferR = RightCh.slice(endBufferPos, RightCh.length);
      var endNewBufferL = LeftCh.slice(endBufferPos, LeftCh.length);
        //console.log(endNewBufferR);
        //console.log(endNewBufferL);
      var addedNewBufferR = Float32Concat(startNewBufferR, endNewBufferR);
      var addedNewBufferL = Float32Concat(startNewBufferL, endNewBufferL);

      buffers[0] = addedNewBufferR;
      buffers[1] = addedNewBufferL;

      var newBuffer = audioContext.createBuffer( 2, buffers[0].length, audioContext.sampleRate );
      newBuffer.getChannelData(0).set(buffers[0]);
      newBuffer.getChannelData(1).set(buffers[1]);
      outerThis2.wavesurferPostRecording.empty();
      outerThis2.wavesurferPostRecording.loadDecodedBuffer(newBuffer);
      outerThis2.wavesurferPostRecording.clearRegions();
      this.regionCreated = false;


  },
  mergeTrackAudioBuffer: function(buffers){

    function Float32Concat(first, second){
      var firstLength = first.length,
          result = new Float32Array(firstLength + second.length);

      result.set(first);
      result.set(second, firstLength);

      return result;
    }

    this.trackAudioBuffers[0] = Float32Concat(this.trackAudioBuffers[0], buffers[0]);
    this.trackAudioBuffers[1] = Float32Concat(this.trackAudioBuffers[1], buffers[1]);

  },
  setStatusMsg: function(bgColor, msg, currentMsg){
    var outerThis = this;
    this.setState({trackStatusMsg: msg, style:{background:bgColor}}, function(){
      setTimeout(function(){
        outerThis.setState(currentMsg);
      }, 800);
    });
  },
  handleEffectsButtons:function(){
    if(this.fileLoadedOrRecorder == false){
      this.setStatusMsg('#FF4D1D','NO RECORDING!', this.currentStatusMsg);
      return;
    }
  },
  handleMute: function(){
    if(this.fileLoadedOrRecorder == false){
      this.setStatusMsg('#FF4D1D','NO RECORDING!', this.currentStatusMsg);
      return;
    }
    this.wavesurferPostRecording.toggleMute();
  },

  render: function(){
    return (
      <div>
      <div className="trackMasterPanel">

       <div className="trackInfoPanel">
          <div className="trackName"> {this.props.trackTitle} </div>
          <div className="buttonsInsideTrack" onClick={this.handleShowWaveLive}> Show Wave </div>
          <div className="buttonsInsideTrack" onClick={this.handleMute}> Mute </div>
          <div className="buttonsInsideTrack"> Solo </div>
          <div className="buttonsInsideTrack" onClick={this.handleDeleteAudio}> Delete Audio </div>
          <div className="regionPanel">
            <div className="RegionName"> REGION CONTROLS </div>
            <div className="buttonsInsideTrack" onClick={this.handleUndoSelection}> Undo Selection </div>
            <div className="buttonsInsideTrack" onClick={this.handleLoop}> Loop </div>
            <div className="buttonsInsideTrack" onClick={this.handleAudioDeleteOnly}> Delete Audio </div>
            <div className="buttonsInsideTrack" onClick={this.handleDeleteRegionAudio}> Delete Region </div>
          </div>

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
          <Effects ref="Effects" statusError={this.handleEffectsButtons}/>
        </div>

        </div>
    );
  }
});

module.exports.Track = Track;

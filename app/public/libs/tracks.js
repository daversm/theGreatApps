function Track(){

  var wavesurfer = Object.create(WaveSurfer);

  wavesurfer.init({
    container     : '#tracksTesing',
    waveColor     : 'black',
    interact      : false,
    cursorWidth   : 0
  });

  var microphone = Object.create(WaveSurfer.Microphone);

  microphone.init({
      wavesurfer: wavesurfer
  });



  var Context = window.AudioContext || window.webkitAudioContext;
  var context = new Context();

  var rec;


  function startWaveform(micSignal){

    microphone.gotStream(micSignal);

  }


  function record() {
    // ask for permission and start recording
    navigator.getUserMedia({audio: true}, function(localMediaStream){
      mediaStream = localMediaStream;

      // create a stream source to pass to Recorder.js
      var mediaStreamSource = context.createMediaStreamSource(localMediaStream);

      // create new instance of Recorder.js using the mediaStreamSource
      microphone.gotStream(localMediaStream);
      rec = new Recorder(mediaStreamSource, {
        //pass the path to recorderWorker.js file here
       workerPath: '../public/Recorderjs/recorderWorker.js'
     });

      rec.record();
    }, function(err){
      console.log('Browser not supported');
    });
  }

    function download() {

// export it to WAV
      rec.exportWAV(function(e){
          rec.clear();
          Recorder.forceDownload(e, "filename.wav");
        });
    }

    function stop() {
    // stop the media stream
      mediaStream.getTracks()[0].stop();
      //MediaStreamTrack.stop();
    // stop Recorder.js
      rec.stop();

    }

    function start() {
    // stop the media stream
    microphone.togglePlay();
      //MediaStreamTrack.stop();
    // stop Recorder.js
      rec.record();

    }

    function pause(){
      microphone.togglePlay();
      rec.stop();
    }

}
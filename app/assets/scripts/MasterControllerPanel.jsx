import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Track } from './Track.jsx';

const MasterController = React.createClass({
  getInitialState: function() {
    return {micSwitchState: false,
            tracksArray : [{trackName:"track1", tracksTitle:"TRACK 1"},
                           {trackName:"track2", tracksTitle:"TRACK 2"},
                           {trackName:"track3", tracksTitle:"TRACK 3"}
                          ]
    };
  },
  componentDidMount: function(){
    var outerThis = this;
    navigator.getUserMedia({audio: true}, function(localMediaStream){
      mediaStream = localMediaStream;
      mediaStreamSource = contextForRec.createMediaStreamSource(mediaStream);
      masterMicStatus = true;
      outerThis.refs['track1'].setMicToRecorder();
      outerThis.refs['track2'].setMicToRecorder();
      outerThis.refs['track3'].setMicToRecorder();
    }, function(err){
      console.log('Browser not supported');
    });

  },
  handleMasterPlay: function(){
    this.refs['track1'].handlePlay();
    this.refs['track2'].handlePlay();
    this.refs['track3'].handlePlay();
  },
  handleMasterPause: function(){
    this.refs['track1'].handlePause();
    this.refs['track2'].handlePause();
    this.refs['track3'].handlePause();
  },
  handleMasterStop: function(){
    this.refs['track1'].handleStop();
    this.refs['track2'].handleStop();
    this.refs['track3'].handleStop();
  },

  render: function() {
    const trackListItems = this.state.tracksArray.map((trackData) => {
      return (
        <Track
            ref={trackData.trackName}
            key={trackData.trackName}
            trackName={trackData.trackName}
            trackTitle={trackData.tracksTitle}
        />
      );
    });

    return (
      <div>
        <div className="masterControllPanel" >

          <div className="masterControllPanelControls">

            <div id="playMaster"    onClick={this.handleMasterPlay}></div>
            <div id="pauseMaster"   onClick={this.handleMasterPause}></div>
            <div id="stopMaster"    onClick={this.handleMasterStop}></div>

          </div>
        </div>
          <div id="tracksDiv">
            <div>
              {trackListItems}
            </div>
          </div>
      </ div>
    );
  }
});

render(
<MasterController />,
document.getElementById('masterContainer')
);

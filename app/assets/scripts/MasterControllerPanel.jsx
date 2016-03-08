import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Track } from './Track.jsx';
var ReactSuperSelect = require('react-super-select');

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
      console.log('Browsers not supported');
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
  userDropDown : function(option) {

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
    var testData = [
    {
      "id": "5507c0528152e61f3c348d56",
      "name": "elit laborum et",
      "size": "Large"
    },
    {
      "id": "5507c0526305bceb0c0e2c7a",
      "name": "dolor nulla velit",
      "size": "Medium"
    },
    ];

    return (
      <div>
        <div className="masterControllPanel" >


          <div className="masterControllPanelControls">

            <div id="playMaster"    onClick={this.handleMasterPlay}></div>
            <div id="pauseMaster"   onClick={this.handleMasterPause}></div>
            <div id="stopMaster"    onClick={this.handleMasterStop}></div>

          </div>
          <div className="titleTopCorner">
            GORILLA DAW
          </div>
          <div className="masterInfo">
            <div className="userIcon"></div>
            <ReactSuperSelect placeholder="user: demo"
                  dataSource={[
                  {
                    "id": "5507c0528152e61f3c348d56",
                    "name": "elit laborum et",
                    "size": "Large"
                  },
                  {
                    "id": "5507c0526305bceb0c0e2c7a",
                    "name": "dolor nulla velit",
                    "size": "Medium"
                  },
                  ]}
                  onChange={this.userDropDown}
            />
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

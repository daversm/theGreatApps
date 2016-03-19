import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Track } from './Track.jsx';
var ReactSuperSelect = require('react-super-select');

const MasterController = React.createClass({
  getInitialState: function() {
    return {micSwitchState: false, userName:"Loading",
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
      mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);
      masterMicStatus = true;
      outerThis.refs['track1'].setMicToRecorder();
      outerThis.refs['track2'].setMicToRecorder();
      outerThis.refs['track3'].setMicToRecorder();
    }, function(err){
      console.log('Browsers not supported');
    });

    $.post('getUserInfo', function(result) {

          this.projects = JSON.parse(result.projects);
          console.log(this.projects);
          this.numberProjects = Object.keys(this.projects).length;

        this.setState({userName : result.username});
        this.rerender();
    }.bind(this));

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
  handleCheckForLiveTracks: function(){
    return (
      this.refs['track1'].isThisTrackLive() ||
      this.refs['track2'].isThisTrackLive() ||
      this.refs['track3'].isThisTrackLive()
    );
  },
  handleMuteThisTrack: function(e){
    return (
      this.refs['track1'].isThisTrackLive() ||
      this.refs['track2'].isThisTrackLive() ||
      this.refs['track3'].isThisTrackLive()
    );
  },
  navHome: function(){
    window.location.href= '/';
  },
  navSignup: function(){
    window.location.href= '/signup';
  },
  userDropDown : function(option) {

    if(option.id === "LogOut"){
      window.location.href = '/logout';
    }
    if(option.id === "Settings"){
      window.location.href = '/settings';
    }
    if(option.id === "Projects"){
      window.location.href = '/profile';
    }

  },


  render: function() {
    const trackListItems = this.state.tracksArray.map((trackData) => {
      return (
        <Track
            ref={trackData.trackName}
            key={trackData.trackName}
            trackName={trackData.trackName}
            trackTitle={trackData.tracksTitle}
            checkForLiveTrack = {this.handleCheckForLiveTracks}
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
          <div className="titleTopCorner">
            GORILLA DAW
          </div>
          <div className="masterInfo">
            <div className="projectsSettingsButton" onClick={this.navHome}>
              SAVE
            </div>
            <ReactSuperSelect
              placeholder={this.state.userName}
              dataSource={[
                {
                  "id": "LogOut",
                  "name": "LogOut",
                  "size": "small"
                },
                {
                  "id": "Projects",
                  "name": "Projects",
                  "size": "small"
                },
                {
                  "id": "Settings",
                  "name": "Settings",
                  "size": "small"
                }
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

import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Track } from './Track.jsx';
var ReactSuperSelect = require('react-super-select');

const MasterController = React.createClass({
  getInitialState: function() {

    return {micSwitchState: false, userName:"Loading", dropDownMore:[],
            dropDownActive: false, moreButtonStatus:"projectsSettingsButton",
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

    }.bind(this));

    $.post('getProjectID', function(result) {
          this.projectID = result.projectID;
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
  handleSettingsURL: function(){
    window.location.href = '/settings';
  },
  handleProjectsURL: function(){
    window.location.href = '/profile';
  },
  handleLogoutURL: function(){
    window.location.href = '/logout';
  },


  handleLoad: function(){
     var outerThis = this;
     var request1l = new XMLHttpRequest();
     var request1r = new XMLHttpRequest();

     var request2l = new XMLHttpRequest();
     var request2r = new XMLHttpRequest();

     var request3l = new XMLHttpRequest();
     var request3r = new XMLHttpRequest();

     request1l.open("GET", "/downloadTrackOneL", true);
     request1r.open("GET", "/downloadTrackOneR", true);

     request2l.open("GET", "/downloadTrackTwoL", true);
     request2r.open("GET", "/downloadTrackTwoR", true);

     request3l.open("GET", "/downloadTrackThreeL", true);
     request3r.open("GET", "/downloadTrackThreeR", true);

     request1l.responseType = 'arraybuffer';
     request1r.responseType = 'arraybuffer';

     request2l.responseType = 'arraybuffer';
     request2r.responseType = 'arraybuffer';

     request3l.responseType = 'arraybuffer';
     request3r.responseType = 'arraybuffer';

     var buffer1l
     request1l.onload = function() {
        console.log(new Float32Array(request1l.response));
        buffer1l = request1l.response;
        request1r.send();
     };
     var buffer1r
     request1r.onload = function() {
        console.log(new Float32Array(request1r.response));
        buffer1r = request1r.response;
        outerThis.refs['track1'].handleLoad(buffer1l, buffer1r);
     };
     request1l.send();


     var buffer2l
     request2l.onload = function() {
        console.log(new Float32Array(request2l.response));
        buffer2l = request2l.response;
        request2r.send();
     };
     var buffer2r
     request2r.onload = function() {
        console.log(new Float32Array(request2r.response));
        buffer2r = request2r.response;
        outerThis.refs['track2'].handleLoad(buffer2l, buffer2r);
     };
     request2l.send();


     var buffer3l
     request3l.onload = function() {
        console.log(new Float32Array(request3l.response));
        buffer3l = request3l.response;
        request3r.send();
     };
     var buffer3r
     request3r.onload = function() {
        console.log(new Float32Array(request3r.response));
        buffer3r = request3r.response;
        outerThis.refs['track3'].handleLoad(buffer3l, buffer3r);
     };
     request3l.send();

  },
  handleSave:function(){
    var outerThis = this;
    var trackOneBuffers = this.refs['track1'].handleSave() || [[]];
    var trackTwoBuffers = this.refs['track2'].handleSave() || [[]];
    var trackThreeBuffers = this.refs['track3'].handleSave() || [[]];

    if(trackOneBuffers[0].length > 1){
      $.ajax({
         url: '/uploadTrackOneL',
         type: 'POST',
         data:trackOneBuffers[0],
         contentType: false,
         processData: false,
         success:function(data) {
           $.ajax({
              url: '/uploadTrackOneR',
              type: 'POST',
              data:trackOneBuffers[1],
              contentType: false,
              processData: false,
              success:function(data){
                if(data.error === false){
                  trackTwoSave();
                }
              }
           });
         }
      });
    }else{
      trackTwoSave();
    }

    function trackTwoSave(){
      if(trackTwoBuffers[0].length > 1){
        $.ajax({
           url: '/uploadTrackTwoL',
           type: 'POST',
           data: trackTwoBuffers[0],
           contentType: false,
           processData: false,
           success:function(data) {
             $.ajax({
                url: '/uploadTrackTwoR',
                type: 'POST',
                data: trackTwoBuffers[1],
                contentType: false,
                processData: false,
                success:function(data){
                  if(data.error === false){
                    trackThreeSave();
                  }
                }

             });
           }
        });
      }else{
        trackThreeSave();
      }
    }

    function trackThreeSave(){
      if(trackThreeBuffers[0].length > 1){
        $.ajax({
           url: '/uploadTrackThreeL',
           type: 'POST',
           data: trackThreeBuffers[0],
           contentType: false,
           processData: false,
           success:function(data) {
             $.ajax({
                url: '/uploadTrackThreeR',
                type: 'POST',
                data: trackThreeBuffers[1],
                contentType: false,
                processData: false,

             });
           }
        });
      }
    }

  },
  handleMore:function(){
    var outerThis = this;
    if(this.state.dropDownActive == false){
      var drop = function(){
        return(
          <div className="testBox" >
            {outerThis.state.userName}
            <hr className="hrStyle"></hr>
            <div className="projectsSettingsButton" onClick={outerThis.handleSettingsURL}>
              settings
            </div>
            <div className="projectsSettingsButton" onClick={outerThis.handleProjectsURL}>
              projects
            </div>
            <div className="projectsSettingsButton" onClick={outerThis.handleLogoutURL}>
              logout
            </div>
          </div>
        );
      }();
      this.setState({dropDownMore:drop, dropDownActive:true,moreButtonStatus:"projectsSettingsButtonClicked" });
    }else{
      this.setState({dropDownMore:[], dropDownActive:false,moreButtonStatus:"projectsSettingsButton"});
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
            projectID = {this.projectID}
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
            <div className="projectsSettingsButton" onClick={this.handleSave}>
              SAVE
            </div>
            <div className="projectsSettingsButton" onClick={this.handleLoad}>
              LOAD
            </div>
            <div className={this.state.moreButtonStatus} onClick={this.handleMore}>
              USER
              {this.state.dropDownMore}
            </div>
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
  <MasterController />, document.getElementById('masterContainer')
);

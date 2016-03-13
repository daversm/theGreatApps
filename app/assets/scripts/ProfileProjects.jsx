import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
var ReactSuperSelect = require('react-super-select');

const MasterController = React.createClass({
  getInitialState:function(){
    return({userName:"Loading"});
  },
  componentDidMount: function(){
    var outerThis = this;
    this.userName = '';

    $.post('getUserName', function(result) {

        this.setState({userName : result.username});

    }.bind(this));


  },
  userDropDown : function(option) {
    
    if(option.id === "LogOut"){
      window.location.href = '/logout';
    }

  },

  render: function() {
    /*
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
    */
    var userData = [
      {
        "id": "LogOut",
        "name": this.userName,
        "size": "Large"
      }
    ];

    return (
      <div>
        <div className="masterControllPanel" >
          <div className="projectsSettings">
            <div className="projectsSettingsButtonClicked">
              PROJECTS
            </div>
            <div className="projectsSettingsButton">
              SETTINGS
            </div>
          </div>

          <div className="titleTopCorner">
            GORILLA DAW
          </div>
          <div className="masterInfo">
            <ReactSuperSelect
              placeholder={this.state.userName}
              dataSource={[
                {
                  "id": "LogOut",
                  "name": "LogOut",
                  "size": "Large"
                }
              ]}
              onChange={this.userDropDown}
            />
          </div>
        </div>
          <div id="tracksDiv">
            <div>

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

import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
var ReactSuperSelect = require('react-super-select');

const MasterController = React.createClass({
  getInitialState:function(){
    return({userName:"Loading", numberProjects:0});
  },
  componentDidMount: function(){
    var outerThis = this;
    this.userName = '';

    $.post('getUserInfo', function(result) {
        this.setState({userName : result.username});
    }.bind(this));

    $.ajax({
      url: '/updateProjects',
      type: 'POST',
      data: {projectToPush: "hi" },
      success: function(data) {
        console.log(data.msg)

       }
     });


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
                  "size": "small"
                }
              ]}
              onChange={this.userDropDown}
            />
          </div>
        </div>
          <div id="projects">
            <div className="addProject">
              Your Projects
              <div className="numberPorjects">{this.state.numberProjects}/10</div>
              <div className="plusButton"> + </div>
            </div>
          </div>
      </div>
    );
  }
});

render(
<MasterController />,
document.getElementById('masterContainer')
);

import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
var ReactSuperSelect = require('react-super-select');
var Project = require('./Project.jsx');

const MasterController = React.createClass({
  getInitialState:function(){
    return({userName:"Loading", numberProjects:0});
  },
  componentDidMount: function(){
    var outerThis = this;
    this.userName = '';

    $.post('getUserInfo', function(result) {

          this.projects = result.projects;
          console.log(this.projects);
          this.numberProjects = Object.keys(this.projects).length;


        this.setState({userName : result.username, numberProjects: this.numberProjects});
    }.bind(this));


  },
  addNewProject: function(){
    if(this.numberProjects < 10){
      var outerThis = this;

      for(var i=0; i<10; i++){
        console.log("------------------------------");
        console.log(i);
        console.log(this.projects);
        if(!(i in Object.keys(this.projects))){

          this.projects[i] = {title:"", trackOneUrl:"", trackTwoUrl:"", trackThreeUrl:""};
          var toStr = JSON.stringify(this.projects);
          $.ajax({
            url: '/updateProjects',
            type: 'POST',
            dataType: "json",
            data: {projects:toStr},
            success: function(data) {
              if(data.error == false){
                console.log(outerThis.projects);
                console.log(data.projects)
                outerThis.projects = data.projects;
                outerThis.numberProjects = Object.keys(data.projects).length;
                outerThis.setState({numberProjects: outerThis.numberProjects});
              }
             }
           });
          return;
        }
      }
    }
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
            <div className="addProject" >
              Your Projects
              <div className="numberPorjects">{this.state.numberProjects}/10</div>
              <div className="plusButton" onClick={this.addNewProject}> + </div>
            </div>
            <br></br>
            <Project />
            <Project />
            <Project />
          </div>
      </div>
    );
  }
});

render(
<MasterController />,
document.getElementById('masterContainer')
);

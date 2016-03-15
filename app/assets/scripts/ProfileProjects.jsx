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
        if(result.projects == false){
          this.projects = {};
          console.log(result.projects);
          this.numberProjects = 0;
        }else{
          this.projects = result.projects;
          console.log(result.projects);
          this.numberProjects = Object.keys(result.projects).length;
        }
        this.setState({userName : result.username, numberProjects: this.numberProjects});
    }.bind(this));


  },
  addNewProject: function(){
    console.log("current projects object");
    console.log(this.projects.keys);

    if(this.numberProjects < 10){
      var outerThis = this;

      for(var i=0; i<10; i++){
        console.log(i);
        if(!(i in Object.keys(this.projects))){
          this.projects[i] = {title:"", trackOneUrl:"", trackTwoUrl:"", trackThreeUrl:""};
          $.ajax({
            url: '/updateProjects',
            type: 'POST',
            data: {projects:outerThis.projects},
            success: function(data) {
              if(data.error == false){
                console.log(data.projects)
                outerThis.projects = data.projects;
                this.numberProjects = Object.keys(this.projects).length;
                outerThis.setState({numberProjects: this.numberProjects});
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

import jQuery from 'jquery';
import React from 'react';
import { render } from 'react-dom';
var ReactSuperSelect = require('react-super-select');
var Project = require('./Project.jsx');

const MasterController = React.createClass({
  getInitialState:function(){
    //this.projectList={};
    return({userName:"Loading", numberProjects:0, dropDownMore:[],
            dropDownActive: false, moreButtonStatus:"projectsSettingsButton"});
  },
  componentDidMount: function(){
    var outerThis = this;
    this.userName = '';

    $.post('getUserInfo', function(result) {

          this.projects = JSON.parse(result.projects);
          console.log(this.projects);
          this.numberProjects = Object.keys(this.projects).length;

        this.setState({userName : result.username, numberProjects: this.numberProjects});
        this.rerender();
    }.bind(this));

    //this.rerender();


  },
  rerender: function(){
    var outerThis = this;
    this.projectList = Object.keys(this.projects).map(function(index) {
      return(
        <Project
          key={index}
          id={index}
          projectObject = {outerThis.projects[index]}
          handleLoadSave = {outerThis.handleLoadSave}
          handleDeleteProject = {outerThis.handleDeleteProject}
        />
      );
    });
    this.forceUpdate();
  },
  addNewProject: function(){
    if(this.numberProjects < 10){
      var outerThis = this;

      for(var i=0; i<10; i++){

        if(!(i in this.projects)){

          this.projects[i] = {title:"", trackOne:{L:"", R:""}, trackTwo:{L:"", R:""}, trackThree:{L:"", R:""}};
          var toStr = JSON.stringify(this.projects);
          $.ajax({
            url: '/updateProjects',
            type: 'POST',
            dataType: "json",
            data: {projects:toStr},
            success: function(data) {
              if(data.error == false){
                console.log("------------------------------");
                console.log(JSON.parse(data.projects));
                outerThis.projects = JSON.parse(data.projects);
                outerThis.numberProjects = Object.keys(outerThis.projects).length;
                outerThis.setState({numberProjects: outerThis.numberProjects});
                outerThis.rerender();
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
  handleLoadSave: function(buttonType, id, newTitle){
    if(buttonType === "SAVE"){
      this.projects[id].title = newTitle;
      var toStr = JSON.stringify(this.projects);
      var outerThis = this;
      $.ajax({
        url: '/updateProjects',
        type: 'POST',
        dataType: "json",
        data: {projects:toStr},
        success: function(data) {
          if(data.error == false){
            //console.log("------------------------------");
            //console.log(JSON.parse(data.projects));
            outerThis.projects = JSON.parse(data.projects);
            outerThis.numberProjects = Object.keys(outerThis.projects).length;
            outerThis.setState({numberProjects: outerThis.numberProjects});
            outerThis.rerender();
          }
         }
       });
       return;
    }
    if(buttonType === "LOAD"){
      $.ajax({
          url: '/loadProject',
          type: 'POST',
          dataType: "json",
          data: {project:id},
          success: function(data) {
            window.location.href= '/daw';
          }
       });
    }
  },
  handleDeleteProject:function(id){
    var outerThis = this;

    $.ajax({
      url: '/deleteAProject',
      type: 'POST',
      dataType: "json",
      data: {id:id},
      success: function(data) {
        if (data.error == false){
          delete outerThis.projects[id];
          var toStr = JSON.stringify(outerThis.projects);
          $.ajax({
            url: '/updateProjects',
            type: 'POST',
            dataType: "json",
            data: {projects:toStr},
            success: function(data) {
              if(data.error == false){
                //console.log("------------------------------");
                //console.log(JSON.parse(data.projects));
                outerThis.projects = JSON.parse(data.projects);
                outerThis.numberProjects = Object.keys(outerThis.projects).length;
                outerThis.setState({numberProjects: outerThis.numberProjects});
                outerThis.rerender();
              }
             }
           });
        }
      }
     });

  },
  handleLogoutURL: function(){
    window.location.href = '/logout';
  },
  handleMore:function(){
    var outerThis = this;
    if(this.state.dropDownActive == false){
      var drop = function(){
        return(
          <div className="testBox" >
            {outerThis.state.userName}
            <hr className="hrStyle"></hr>

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

          </div>

          <div className="titleTopCorner">
            PENTATONIC
          </div>
          <div className="masterInfo">
            <div className={this.state.moreButtonStatus} onClick={this.handleMore}>
              USER
              {this.state.dropDownMore}
            </div>
          </div>
        </div>
          <div id="projects">
            <div className="addProject" >
              Your Projects
              <div className="numberPorjects">{this.state.numberProjects}/10</div>
              <div className="plusButton" onClick={this.addNewProject}> + </div>
            </div>
            <br></br>
            {this.projectList}
          </div>
      </div>
    );
  }
});

render(
<MasterController />,
document.getElementById('masterContainer')
);

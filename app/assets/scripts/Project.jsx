var React = require('react');
var ReactDOM = require('react-dom');

var project = React.createClass({
  getInitialState:function(){
    return({loadButton:"LOAD", classLoad:"loadProjectButton", value:this.props.projectObject.title});
  },

  handleTitleChange:function(e){
    var outer = this;
    this.setState({loadButton:"SAVE", classLoad:"loadProjectButtonSaving", value:e.target.value});


  },
  handleClickLoadSave:function(){
    this.props.handleLoadSave(this.state.loadButton, this.props.id, this.state.value);
    this.setState({loadButton:"LOAD", classLoad:"loadProjectButton"});
  },
  handleDeleteProject:function(){
    this.props.handleDeleteProject(this.props.id);
  },

  render:function(){

    return(
      <div className="projectDiv">
        <input
          value={this.state.value}
          type="text" className="projectName"
          placeholder="enter project title"
          onChange={this.handleTitleChange}
        />
      <div className={this.state.classLoad} onClick={this.handleClickLoadSave}>{this.state.loadButton}</div>
        <div className="deleteProjectButton" onClick={this.handleDeleteProject}>-</div>
      </div>
    )
  }

});

module.exports = project;

var React = require('react');
var ReactDOM = require('react-dom');

var project = React.createClass({
  getInitialState:function(){
    return({loadButton:"LOAD", classLoad:"loadProjectButton", value:this.props.projectObject.title});
  },

  handleTitleChange:function(e){
    var outer = this;
    this.setState({loadButton:"SAVE", classLoad:"loadProjectButtonSaving", value:e.target.value});

    setTimeout(function(){
      outer.setState({loadButton:"LOAD", classLoad:"loadProjectButton"});
    }, 200);

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
        <div className={this.state.classLoad}>{this.state.loadButton}</div>
        <div className="deleteProjectButton">-</div>
      </div>
    )
  }

});

module.exports = project;

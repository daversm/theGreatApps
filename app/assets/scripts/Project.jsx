var React = require('react');
var ReactDOM = require('react-dom');

var project = React.createClass({

  render:function(){

    return(
      <div className="projectDiv">
        project title
        <div className="deleteProjectButton">-</div>
      </div>
    )
  }

});

module.exports = project;

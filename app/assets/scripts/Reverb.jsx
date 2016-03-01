var React = require('react');
var ReactDOM = require('react-dom');
var Select = require('react-select');

var Reverb = React.createClass({
  getInitialState: function(){

    this.defaultOption = { value: 'two', label: 'Two' };
    return({power:false});
  },
  setWaveform: function(param){
    console.log('wavesurfer set delay');
    this.wavesurfer = param;
  },
  OnOffReverb: function(e){
    console.log(this.Compressor);
    if(this.power){
      console.log('now off');
      this.wavesurfer.backend.disconnectFilters();
      this.power = false;
    }else{
      console.log('now on');
      this.wavesurfer.backend.setFilters([this.compressor]);
      this.power = true;
    }
  },
  setTuna: function(param){
    this.tuna = param;

    this.convolver = new this.tuna.Convolver({
      highCut: 22050,                         //20 to 22050
      lowCut: 20,                             //20 to 22050
      dryLevel: 1,                            //0 to 1+
      wetLevel: 1,                            //0 to 1+
      level: 1,                               //0 to 1+, adjusts total output of both wet and dry
      impulse: "impulses/impulse_rev.wav",    //the path to your impulse response
      bypass: 0
    });

  },
  reverbPick: function(){

  },
  render: function(){
    const options = [
     { value: 'one', label: 'One' },
     { value: 'two', label: 'Two' },
     {
      type: 'group', name: 'group1', items: [
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' }
      ]
     },
     {
      type: 'group', name: 'group2', items: [
        { value: 'five', label: 'Five' },
        { value: 'six', label: 'Six' }
      ]
     }
   ]
    return(
      <div className='delayHolder'>
        <div className="delayTitle">
          <Select
             options={options}
             onChange={this.reverbPick}
             value="one"
             clearable={false}
             className="DropDownDiv"
             name="Select an option"
          />
        </div>
        
      </div>

    );
  }

});

module.exports = Reverb;

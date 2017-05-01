import React from 'react';

const Tempo = props => (
  <div id="tempo" className="customization">
    <h4>Tempo</h4>
    <input type="number" value={props.tempo} onChange={ e => props.changeProp('tempo', e.target.value) } placeholder="120" />
  </div>
);

export default Tempo;
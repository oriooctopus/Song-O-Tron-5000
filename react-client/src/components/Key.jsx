import React from 'react';

const Key = props => (
  <div id="key" className="customization">
    <h4>Key</h4>
    {props.changeKey}
    <select onChange={ e => props.changeProp('key', e.target.value) } >
      {
        props.keys.map((element) => {
          return <option key={element} value={element}>{element}</option> 
        })
      }
    </select>
  </div>
);

export default Key;
import React from 'react';

const Satisfaction = props => (
  <div id="satisfaction" className={"customization " + props.popupClass} >
    <h3>What would you rate this song out of ten?</h3>
    <input value={props.satisfaction} onChange={props.changeSatisfaction} />
  </div>
);

export default Satisfaction;
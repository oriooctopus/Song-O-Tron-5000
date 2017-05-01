import React from 'react';
import Slider, { Range } from 'rc-slider';

const Right = (props) => (
  <section className="side">
    <h1>Right</h1>
    <div className="customizations">
      <h4>Frequency</h4>
      <Slider min={0} max={10} defaultValue={5} onChange={ value => props.changeProp('rightFrequency', value) } />
    </div>
  </section>
)

export default Right;
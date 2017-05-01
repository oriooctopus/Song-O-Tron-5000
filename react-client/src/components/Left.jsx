import React from 'react';
import Slider, { Range } from 'rc-slider';

const Left = (props) => (
  <section className="side">
    <h1>Left</h1>
    <div className="customizations">
      <h4>Frequency</h4>
      <Slider min={0} max={10} defaultValue={5} onChange={ value => props.changeProp('leftFrequency', value) } />
    </div>
  </section>
)

export default Left;
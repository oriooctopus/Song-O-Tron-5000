import React from 'react';
import Buttons from './Buttons.jsx';
import Key from './Key.jsx';
import Tempo from './Tempo.jsx';
import Satisfaction from './Satisfaction.jsx';

const Center = props => (
  <section id="center">
    <h2>Song-O-Tron</h2>
    <h1><b>5000</b></h1>

    <div className="customizations">
      <Key 
        changeProp={props.changeProp}
        keys={props.keys} 
      />
      <Tempo 
        changeProp={props.changeProp}
        tempo={props.tempo}
      />
      <Satisfaction
        changeSatisfaction={props.changeSatisfaction}
        satisfaction={props.satisfaction}
        popupClass={props.popupClass}
      />
      <Buttons 
        togglePlay={props.togglePlay}
        createSong={props.createSong} 
        togglePlayClass={props.togglePlayClass}
        initButtonClass={props.initButtonClass}
        popupClass={props.popupClass}
      />
    </div>
  </section>
);


export default Center;
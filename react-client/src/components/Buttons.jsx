import React from 'react';

const Buttons = props => (
  <section id="buttons">
    <div className="customization">
      <div className={"button togglePlay " + props.popupClass} onClick={props.togglePlay} >
        <i className={props.togglePlayClass} ></i>
      </div>
      <div id="generate" className={"button " + props.initButtonClass} onClick={props.createSong} ><a>Generate</a></div>
      <h5 id="createAnother" className={props.popupClass} onClick={props.createSong} >Generate Another Song</h5>
    </div>
  </section>
);

export default Buttons;
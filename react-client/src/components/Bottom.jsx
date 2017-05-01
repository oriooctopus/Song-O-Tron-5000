import React from 'react';

const Bottom = props => (
  <section id="statistics">
    <div id="songCount">
      <h4>Songs Written:</h4>
      <h2>{props.songsMade}</h2>
    </div>
    <div id="averageRating">
      <h4>Average Rating:</h4>
      <h2>{props.averageSatisfaction}</h2>
    </div>
    <div id="averageTempo">
      <h4>Average Tempo:</h4>
      <h2>{props.averageTempo}</h2>
    </div>
  </section>
);

export default Bottom;
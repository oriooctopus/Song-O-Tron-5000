var baseRhythms = [
  ['quarter', 1],
  ['eighth', .5],
  ['dottedQuarter', 1.5],
  ['quarter', 1],
  ['dottedEighth', .75],
  ['sixteenth', .25]
  // ['dottedHalf', 3],
  // ['whole', 4]
  // ['dottedSixteenth', .375],
];

var chooseLength = function(rhythms) {
  var index = Math.floor(Math.random() * 4);
  for (var i = 0; i < rhythms.length + 2; i++) {
    index += (Math.floor(Math.random() * 2)) ? 1 : -1;
  }
  if (index < 0 || index >= rhythms.length) {
    return chooseLength(rhythms);
  } else {
    return rhythms[index];
  }
};

var generateRhythmArray = function(timeLeftInMeasure, timeLeftInBeat) {
  // the lower the index the more likely the note is to be played
  var arr = [];

  // adds for timeLeftInMeasure
  for (var i = 0; i < baseRhythms.length; i++) {
    if (baseRhythms[i][1] === timeLeftInMeasure) {
      arr.push(baseRhythms[i]);        
      break;
    }
  }
  // adds for time left in beat
  for (var i = 0; i < baseRhythms.length; i++) {
    if (baseRhythms[i][1] === timeLeftInBeat) {
      arr.push(baseRhythms[i]);
      arr.push(baseRhythms[i]);
      arr.push(baseRhythms[i]);
      break;
    }
  }
  return arr.concat(baseRhythms);
}

var generateMelodyRhythm = function(timeLeftInMeasure, timeLeftInBeat, previousRhythm) {
  var generatedRhythmArray = generateRhythmArray(timeLeftInMeasure, timeLeftInBeat);
  return chooseLength(generatedRhythmArray);
};

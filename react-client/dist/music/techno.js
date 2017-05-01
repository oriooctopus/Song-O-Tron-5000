var isKeyViable = function(currentScale, potentialScale) {
  var counter = 0;
  for (var i = 0; i < potentialScale.length; i++) {
    if (!currentScale.includes(potentialScale[i])) {
      if (counter === 2) {
        return false;
      }
      counter++;
    }
  }
  return counter !== 0;
}

var generateNextScale = function(currentScale) {
  var recurse = function(newKey) {
    // check if major or minor scale is one note away or less from current scale
    if (Math.floor(Math.random() * 2)) {
      var newScale = generateMajorScale(newKey);
      if (isKeyViable(currentScale, newScale)) {
        return newScale;
      } else {
        newScale = generateMinorScale(newKey);
        if (isKeyViable(currentScale, newScale)) {
          return newScale;
        }
      }
    } else {
      var newScale = generateMinorScale(newKey);
      if (isKeyViable(currentScale, newScale)) {
        return newScale;
      } else {
        newScale = generateMajorScale(newKey);
        if (isKeyViable(currentScale, newScale)) {
          return newScale;
        }
      }
    }

    // otherwise regenerate
    var newKey = notesInOctave[Math.floor(Math.random() * notesInOctave.length)];
    return recurse(newKey);
  };
  // first call is tritone away because it will never work
  var newKey = notesInOctave[Math.floor(Math.random() * notesInOctave.length)];
  return recurse(newKey);
};

var generateLeftHand = function(startingKey, scaleChanges) {

  var leftHand = [];
  var rhythms = [
    ['whole', 4],
    ['dottedHalf', 3],
    ['half', 2],
    ['dottedQuarter', 1.5],
    ['quarter', 1],
    ['dottedEighth', .75],
    ['eighth', .5],
    ['sixteenth', .25]
  ];

  var currentScale = generateMinorScale(startingKey);
  // scaleChanges.shift();

  while (scaleChanges.length > 0) {
    
    if (scaleChanges[0][1] === 0) {
      if (scaleChanges.length <= 1) {
        break;
      }
      scaleChanges.shift();
      currentScale = generateMinorScale(scaleChanges[0][0]);
      // change the scale and take first element off array
    } else {
      for (var i = 0; i < rhythms.length; i++) {
        if (rhythms[i][1] <= scaleChanges[0][1]) {
          leftHand.push([rhythms[i][0], currentScale[0] + String(3)]);
          scaleChanges[0][1] -= rhythms[i][1];
          break;
        }
      }
    }
  }
  return leftHand;

};

var generateRightHand = function(currentRoot, measures, beatsInMeasure) {
  var beatsLeft = measures * beatsInMeasure;
  var rightHand = [];
  var currentScale = generateMinorScale(currentRoot);
  var beatsSinceScaleChange = 0;
  var scaleChanges = [];

  while (beatsLeft > 0) {
    console.log(beatsLeft);
    // new way to determine whether key should be changed
    if ( (beatsLeft / beatsInMeasure) % 2 === 0 && beatsSinceScaleChange !== 0) {
      if ( (beatsSinceScaleChange / 4) >= 4) {
        scaleChanges.push([currentScale[0], beatsSinceScaleChange]);
        currentScale = generateNextScale(currentScale);
        beatsSinceScaleChange = 0;
      } else {
        if (Math.floor(Math.random() * 2) || Math.floor(Math.random() * 2) ) {
          scaleChanges.push([currentScale[0], beatsSinceScaleChange]);
          currentScale = generateNextScale(currentScale);
          beatsSinceScaleChange = 0; 
        }
      }
    }

    // new way to choose a rhythm
    var rhythm = generateMelodyRhythm(beatsLeft % 4, beatsLeft % 1);
    var rhythmName = rhythm[0];
    var rhythmLength = rhythm[1];

    // choose a note
    var notesIndex = Math.floor(Math.random() * currentScale.length);
    var note = currentScale[notesIndex];
    // choose an octave
    var octave = 4;
    // combine everything
    rightHand.push([rhythm[0], note + String(octave)]);
    beatsLeft -= rhythm[1];
    beatsSinceScaleChange += rhythm[1];
    // leftHandCounter += rhythm[1];

  }
  var tempScaleChanges = [];
  for (var i = 0; i < scaleChanges.length; i++) {
    tempScaleChanges.push(scaleChanges[i][0], scaleChanges[i][1]);
  }
  console.log(tempScaleChanges);

  return [rightHand, scaleChanges];
};

var generateTechnoSongData = function(key) {
  var measures = 24;
  var beatsInMeasure = 4;
  var beatsLeft = measures * beatsInMeasure;
  var currentRoot = key;

  var rightHandData = generateRightHand(currentRoot, measures, beatsInMeasure);
  var rightHandNotes = rightHandData[0];
  var scaleChanges = rightHandData[1];
  var averageChangesPerMeasure = Number((scaleChanges.length / measures).toFixed(2));

  var leftHand = generateLeftHand(key, scaleChanges);
  console.log('the left hand', leftHand);

  return [leftHand, rightHandNotes, averageChangesPerMeasure];
};

var generateTechnoSong = function(key, tempo) {
  var conductor = new BandJS();
  conductor.setTimeSignature(4, 4);
  conductor.setTempo(tempo);
  var leftHand = conductor.createInstrument();
  var rightHand = conductor.createInstrument();
  var songData = generateTechnoSongData(key);
  var leftHandNotes = songData[0];
  var rightHandNotes = songData[1];
  var averageChangesPerMeasure = songData[2];
  console.log(songData);

  // makeLeftHand
  leftHandNotes.forEach((note) => {
    leftHand.note(note[0], note[1]);
  });

  // make rightHand
  rightHandNotes.forEach((note) => {
    rightHand.note(note[0], note[1]);
    // rightHand.rest(note[0]);
  });

  player = conductor.finish();
  player.play();

  return [tempo, notesInOctave.indexOf(key), averageChangesPerMeasure];
};
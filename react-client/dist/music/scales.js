var notesInOctave = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var player;

var generateScale = function(startingNote, scaleDistances) {
  var index = notesInOctave.indexOf(startingNote);
  var scale = [];
  for (var i = 0; i < scaleDistances.length; i++) {
    index += scaleDistances[i];
    if (index >= notesInOctave.length) {
      index -= notesInOctave.length;
    }
    scale.push(notesInOctave[index]);
  }
  return scale;
};

var generateBluesScale = function(startingNote) {
  var scaleDistances = [0, 3, 2, 1, 1, 3, 2];
  return generateScale(startingNote, scaleDistances);
};

var generateMajorScale = function(startingNote) {
  var scaleDistances = [0, 2, 2, 1, 2, 2, 2, 1];
  return generateScale(startingNote, scaleDistances)
};

var generateMinorScale = function(startingNote) {
  var scaleDistances = [0, 2, 1, 2, 2, 1, 2, 2];
  return generateScale(startingNote, scaleDistances)
};


var generateBluesSongData = function() {

  var measures = 48;
  var beatsInMeasure = 4;
  var beatsLeft = measures * beatsInMeasure;
  var songData = [];
  var beatsSinceScaleChange = 0;

  var scale = generateBluesScale('C');

  while (beatsLeft > 0) {
    
    // choose a rhythm - new version
    var rhythm = generateRhythm(beatsLeft % 4, beatsLeft % 1);
    var rhythmName = rhythm[0];
    var rhythmLength = rhythm[1];


    // choose a note
    var notesIndex = Math.floor(Math.random() * scale.length);
    var note = scale[notesIndex];
    // choose an octave
    var octave = 4;
    // combine everything
    songData.push([rhythmName, note + String(octave)]);
    beatsLeft -= rhythmLength;
    beatsSinceScaleChange += rhythmLength;
  }

  return songData;
}

var generateBluesSong = function() {
  var conductor = new BandJS();
  conductor.setTimeSignature(4, 4);
  conductor.setTempo(120);
  var rightHand = conductor.createInstrument();
  var songData = generateBluesSongData();

  songData.forEach((note) => {
    rightHand.note(note[0], note[1]);
    rightHand.rest(note[0]);
  });

  var player = conductor.finish();
  player.play();
}


import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Left from './components/Left.jsx';
import Center from './components/Center.jsx';
import Right from './components/Right.jsx';
import Bottom from './components/Bottom.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      leftFrequency: 5,
      rightFrequency: 5,
      satisfaction: '',
      key: 'C',
      tempo: 90,
      isPlaying: false,
      hasPlayed: false,
      averageSatisfaction: '',
      songsMade: '',
      togglePlayClass: 'fa fa-play',
      initButtonClass: 'block',
      popupClass: 'invisible',
      songsMade: 0,
      totalRating: 0,
      totalSongsWithRatings: 0,
      totalTempo: 0
    };
    this.keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    this.createSong = this.createSong.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.changeSatisfaction = this.changeSatisfaction.bind(this);

    window.onbeforeunload = () => {
      if (this.state.songData) {
        this.postData();
      }
    }

  }

  componentDidMount() {
    $.ajax({
      url: '/songData', 
      success: (data) => {
        console.log('the data', data);
        this.setState({
          songsMade: data.length,
          totalRating: data.totalRating,
          totalSongsWithRatings: data.totalSongsWithRatings,
          totalTempo: data.totalTempo
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  postData() {
    var songData = [Number(this.state.satisfaction)].concat(this.state.songData);
    songData = JSON.stringify(songData);
    $.ajax({
      contentType: 'application/json',
      data: songData,
      url: '/songData',
      method: 'POST',
      success: function(data) {
        console.log('this worked!', data);
      },
      error: function(err) {
        console.log('this failed!', err);
      }
    });
  }

  changeProp(key, value) {
    this.setState({
      [key]: value
    });
  }

  changeSatisfaction(e) {
    
    if (Number.isInteger(Number(e.target.value)) && e.target.value > -1 && e.target.value <= 10) {
      this.setState({
        satisfaction: e.target.value
      });

      if (this.state.satisfaction === '') {
        this.setState({
          totalSongsWithRatings: this.state.totalSongsWithRatings + 1
        });
      } 

      if (e.target.value === '') {
        this.setState({
          totalSongsWithRatings: this.state.totalSongsWithRatings - 1
        });
      }


      var difference = e.target.value - this.state.satisfaction;
      this.setState({
        totalRating: this.state.totalRating + difference
      });
      // this.state.totalRating += difference; 
    }
  }

  createSong() {

    if (this.state.hasPlayed) {
      player.pause(); 
      this.postData();
    }

    var songData = generateTechnoSong(this.state.key, this.state.tempo);

    this.setState({
      songData: songData,
      isPlaying: true,
      hasPlayed: true,
      hasRated: false,
      satisfaction: '',
      togglePlayClass: 'fa fa-pause',
      initButtonClass: 'invisible',
      popupClass: 'block',
    });
    this.state.songsMade++;
    this.state.totalTempo += Number(this.state.tempo);

  }

  togglePlay() {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false,  
        togglePlayClass: 'fa fa-play' 
      });
      player.pause();
    } else {
      this.setState({
        isPlaying: true,
        togglePlayClass: 'fa fa-pause'
      });
      player.play();
    }
  }


  render () {
    return (
      <div>
        <Left 
          changeProp={this.changeProp}
        />
        <Center 
          keys={this.keys}
          changeProp={this.changeProp}
          changeSatisfaction={this.changeSatisfaction}
          createSong={this.createSong} 
          togglePlay={this.togglePlay} 
          satisfaction={this.state.satisfaction}
          popupClass={this.state.popupClass}
          initButtonClass={this.state.initButtonClass}
          togglePlayClass={this.state.togglePlayClass}
        />
        <Right
          changeProp={this.changeProp}
        />
        <Bottom 
          averageSatisfaction={(this.state.totalRating / this.state.totalSongsWithRatings).toFixed(2)} 
          songsMade={this.state.songsMade} 
          averageTempo={(this.state.totalTempo / this.state.songsMade).toFixed(2)}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
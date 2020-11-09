//Imports
import React, {useState, useRef} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from './components/Library';
import Nav from './components/Nav';
import {playAudio} from './util';
import "./styles/app.scss";
import SongList from './songList';


function App() {

  //ref
  const audioRef = useRef(null);

  //state
  const [songs, setSongs] = useState(SongList());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  //event handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };


  return (
    <div className="App">
      <Nav 
      libraryStatus={libraryStatus} 
      setLibraryStatus={setLibraryStatus} 
      />
      <Song currentSong={currentSong} />
      <Player 
      setSongInfo={setSongInfo}
      songInfo={songInfo}
      audioRef={audioRef}
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      <Library 
      audioRef={audioRef} 
      songs={songs} 
      setCurrentSong={setCurrentSong} 
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus}
      />
      <audio 
      onLoadedMetadata={timeUpdateHandler} 
      onTimeUpdate={timeUpdateHandler} 
      ref={audioRef} 
      src={currentSong.audio} 
      />
    </div>
  );
};

export default App;

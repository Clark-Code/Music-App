//Imports
import React, {useState} from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from './components/Library';
import "./styles/app.scss";
import SongList from './songList';




function App() {

  //state
  const [songs, setSongs] = useState(SongList());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);


  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player 
      setIsPlaying={setIsPlaying} 
      isPlaying={isPlaying} 
      currentSong={currentSong}
      />
      <Library songs={songs} />
    </div>
  );
};

export default App;

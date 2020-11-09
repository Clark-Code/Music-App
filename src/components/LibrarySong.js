//imports
import React from "react";


const LibrarySong = ({
  audioRef, 
  song, 
  songs, 
  setCurrentSong, 
  id,
  isPlaying,
  setSongs
}) => {

  //event handlers
  //play song when selected in library if active is true
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong(selectedSong[0]);
    //add active state
    const newSongs = songs.map((song) => {
      if(song.id === id){
        return{
          ...song,
          active:true,
        };
      }
      else {
        return {
          ...song,
          active:false,
        };
      };
    });
    setSongs(newSongs);
    //check if song is playing
    if(isPlaying){
      const playPromise = audioRef.current.play();
        if(playPromise !== undefined){
          playPromise.then((audio)=> {
          audioRef.current.play();
          });
        };    
    };
  };

  return (
    //if active is true className = selected
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}> 
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3> {song.name} </h3>
        <h4> {song.artist} </h4>
      </div>
    </div>
  );
};

export default LibrarySong;

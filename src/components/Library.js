//imports
import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs} //all songs
            setCurrentSong={setCurrentSong} //change current song
            song={song} //each song with info
            id={song.id} //id of song
            key={song.id} //unique key
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default Library;

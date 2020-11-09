//imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight, 
  faPause
} from "@fortawesome/free-solid-svg-icons";



const Player = ({
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef, 
  setSongInfo, 
  songInfo
}) => {

  //event handlers
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
    else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  };

  //format time -> minute and seconds
  //code source from stackoverflow
  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  };
  
 
  return (
    <div className="player-container">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>

        <input
            value={songInfo.currentTime}
            type="range"
            max={songInfo.duration}
            min={0}
            onChange={dragHandler}
          />

        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward"  size="2x" icon={faAngleRight} />
      </div>
      
    </div>
  );
};

export default Player;

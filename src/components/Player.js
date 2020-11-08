//imports
import React, {useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight, 
  faPause
} from "@fortawesome/free-solid-svg-icons";



const Player = ({currentSong, isPlaying, setIsPlaying}) => {

  //ref
  const audioRef = useRef(null);

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

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration: duration})
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
  
  //state
  const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
  });


  return (
    <div className="player-container">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>

        <input 
        min={0} 
        max={songInfo.duration} 
        value={songInfo.currentTime} 
        type="range" 
        onChange={dragHandler}
        />

        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward"  size="2x" icon={faAngleRight} />
      </div>
      <audio 
      onTimeUpdate={timeUpdateHandler} 
      onLoadedMetadata={timeUpdateHandler} 
      ref={audioRef} 
      src={currentSong.audio} 
      />
    </div>
  );
};

export default Player;

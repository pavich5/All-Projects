"use client";
import React, { useEffect, useMemo, useState } from "react";
import "./page.css";

const Home = () => {
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [activeSound, setActiveSound] = useState(null);
  const sounds = useMemo(() => [
    { char: "Q", sound: "CRASH" },
    { char: "W", sound: "TOM" },
    { char: "E", sound: "RIM" },
    { char: "A", sound: "CLAP" },
    { char: "S", sound: "KICK" },
    { char: "D", sound: "SHAKE" },
    { char: "Z", sound: "O-HAT" },
    { char: "X", sound: "C-HAT" },
  ], []);

  const playSound = (sound:any) => {
    let soundUrl;
    switch (sound) {
      case 'CRASH':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3';
        break;
      case 'TOM':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3';
        break;
      case 'RIM':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3';
        break;
      case 'CLAP':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3';
        break;
      case 'KICK':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3';
        break;
      case 'SHAKE':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3';
        break;
      case 'O-HAT':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3';
        break;
      case 'C-HAT':
        soundUrl = 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3';
        break;
        case 'BEAT':
        soundUrl = '/beat.mp3';
      break;

      default:
        soundUrl = '';
        break;
    }

    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.currentTime = 0;
      audio.play();
      setActiveSound(sound);
      setTimeout(() => {
        setActiveSound(null);
      }, 130);
    }
  };

  const startTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }

    const newTimerId = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
    setTimerId(newTimerId);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimer(0);
      setTimerId(null);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event:any) => {
      const char = event.key.toUpperCase();
      const matchingSound = sounds.find((s) => s.char === char);
      if (matchingSound) {
        playSound(matchingSound.sound);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sounds]);

  return (
    <>
      <div className="custom-button">
        <button onClick={() => playSound("BEAT")} className="beat-button">
          Play Beat
        </button>
      </div>
      <div className="timer-container">
        <span className="timer">{timer} seconds</span>
        <div className="timers">
          <button className="button start-button" onClick={startTimer}>
            Start Timer
          </button>
          <button className="button stop-button" onClick={stopTimer}>
            Stop Timer
          </button>
        </div>
      </div>
      <div className="drum-kit">
        {sounds.map((item) => (
          <div
            key={item.sound}
            className={`drum-pad ${item.sound === activeSound ? "active" : ""}`}
            onClick={() => playSound(item.sound)}
          >
            <p>{item.sound}</p>
            <div className="drum-stick">
              <div className="drum-stick-tip"></div>
            </div>
          </div>
        ))}
        <div className="drum-kit-stand">
          <div className="drum-kit-leg"></div>
          <div className="drum-kit-leg"></div>
          <div className="drum-kit-stick"></div>
        </div>
      </div>
    </>
  );
};

export default Home;

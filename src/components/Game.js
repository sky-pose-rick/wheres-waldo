/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import style from 'styled-components';

import { useParams, useNavigate } from 'react-router-dom';
import Timer from './Timer';
import Target from './Target';
import Marker from './Marker';
import Characters from './Characters';
import Indicator from './Indicator';
import gameLogic from '../gameLogic';

const GameDiv = style.div`{
  display: flex;
  flex-direction: column;
  align-items: center;
}`;

function Game() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [targetOpen, setTargetOpen] = useState(false);
  const [characters, setCharacters] = useState({});
  const [timerStart, setTimerStart] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [imageData, setImageData] = useState({});
  const [gameManager, setGameManager] = useState({});
  const [lastGuess, setLastGuess] = useState({});
  const { levelKey } = useParams();
  const navigate = useNavigate();

  const onClick = (e) => {
    if (!targetOpen) {
      const localX = e.pageX - e.target.x;
      const localY = e.pageY - e.target.y;
      setMouse({ x: localX, y: localY });
    }
    setTargetOpen(!targetOpen);

    // console.log(`PageX: ${e.pageX}, PageY: ${e.pageY},
    // OffsetX: ${e.offsetX}, OffsetY: ${e.offsetY}`);
    // console.log(`ClientX: ${e.clientX}, ClientY: ${e.clientY},
    // ScreenX: ${e.screenX}, ScreenY: ${e.screenY}`);
    // console.log(`x: ${e.target.x}, y: ${e.target.y}`);
    // console.log(e);
  };

  useEffect(() => {
    // TODO: redirect if no level loaded
    gameLogic.loadResources(levelKey).then((result) => {
      setCharacters(result.characters);
      setImageData(result.imageData);
      setGameManager(result.gameManager);
      setTimerStart(true);
      result.gameManager.startTimer();
    });
  }, []);

  const onTargetSelect = (key) => {
    // returns a promise
    gameManager.checkTarget(key, mouse).then((correct) => {
      setTargetOpen(false);
      setLastGuess({ correct, timestamp: Date.now() });
      if (correct) {
        setMarkers(markers.concat({ ...mouse, key }));
        const copy = { ...characters };
        copy[key].found = true;
        setCharacters(copy);
      }
      gameManager.isGameOver().then((gameOver) => {
        if (gameOver) {
          gameManager.stopTimer();
          alert('You win!');
          // navigate to results page
          const sessionKey = gameManager.getSessionKey();
          navigate(`/wheres-waldo/result/${sessionKey}`);
        }
      });
    });
  };

  return (
    <GameDiv>
      { /* should only render timer once all images are loaded */ }
      {timerStart && <Timer />}
      <div className="ImageContainer">
        {targetOpen && (
        <Target
          chars={characters}
          pos={mouse}
          onSelect={onTargetSelect}
        />
        )}
        {
          markers.map((value) => (<Marker pos={value} key={value.key} />))
        }
        <img src={imageData.imageSrc} alt="" onClick={onClick} style={{ width: `${imageData.srcWidth * imageData.scale}px` }} />
        { /* should only render target box and markers after a click */ }
      </div>
      <Indicator lastGuess={lastGuess} />
      <Characters chars={characters} />
    </GameDiv>
  );
}

export default Game;

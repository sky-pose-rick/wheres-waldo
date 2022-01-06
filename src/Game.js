import React from 'react';

import Timer from './components/Timer';
import Target from './Target';
import Marker from './Marker';
import Characters from './Characters';

function Game() {
  return (
    <div className="Game">
      { /* should only render timer once all images are loaded */ }
      <Timer />
      <div className="ImageContainer">
        <img src="game.png" alt="" />
        { /* should only render target box and markers after a click */ }
        <Marker />
        <Target />
      </div>
      <Characters />
    </div>
  );
}

export default Game;

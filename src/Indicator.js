import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

function Indicator({ lastGuess }) {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // set a timer to clear the guess indicator after 2 seconds
  useEffect(() => {
    if (lastGuess.timestamp) {
      if (timeoutId) { clearTimeout(timeoutId); }
      setShow(true);
      setTimeoutId(setTimeout(() => {
        setShow(false);
      }, 2000));
    }
  }, [lastGuess.timestamp]);

  return (
    <div className="Indicator">
      {show && (
      <span
        className={lastGuess.correct ? 'hit' : 'miss'}
      >
        {lastGuess.correct ? 'Hit!' : 'Miss!'}
      </span>
      )}
    </div>
  );
}

Indicator.propTypes = {
  lastGuess: propTypes.shape({
    correct: propTypes.bool,
    timestamp: propTypes.number,
  }),
};

Indicator.defaultProps = {
  lastGuess: {},
};

export default Indicator;

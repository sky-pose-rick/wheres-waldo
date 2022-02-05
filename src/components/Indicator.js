import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import style from 'styled-components';

const IndicatorDiv = style.div`{
  & span{
    font-size: 1.1em;
    background: #baf0b8;
    padding: 0 3em;
    color: green;
  }

  & span.miss{
    color: red;
    background: #c89292;
  }
}`;

function Indicator({ lastGuess }) {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // set a timer to clear the guess indicator after 2 seconds
  useEffect(() => {
    if (lastGuess.timestamp) {
      if (timeoutId) { clearTimeout(timeoutId); }
      setShow(true);
      const latestId = setTimeout(() => {
        setShow(false);
      }, 2000);
      setTimeoutId(latestId);

      // clear this id if component is unloaded
      return () => {
        clearTimeout(latestId);
      };
    }

    return () => {};
  }, [lastGuess.timestamp]);

  return (
    <IndicatorDiv>
      {show && (
      <span
        className={lastGuess.correct ? 'hit' : 'miss'}
      >
        {lastGuess.correct ? 'Hit!' : 'Miss!'}
      </span>
      )}
    </IndicatorDiv>
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

import React, { useEffect, useState } from 'react';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import style from 'styled-components';

const TimerDiv = style.div`{
  & span{
    font-size: 1.1em;
    background: aliceblue;
    padding: 0 3em;
  }
}`;

function Timer() {
  const [start] = useState(new Date());
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const totalSeconds = differenceInSeconds(now, start, { roundingMethod: 'floor' });
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <TimerDiv>
      <span>{timeString}</span>
    </TimerDiv>
  );
}

export default Timer;

import React, { useEffect, useState } from 'react';
import differenceInSeconds from 'date-fns/differenceInSeconds';

function Timer() {
  const [start, setStart] = useState(new Date());
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
    <div className="Timer">
      <span>{timeString}</span>
    </div>
  );
}

export default Timer;

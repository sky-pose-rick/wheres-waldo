import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from 'styled-components';
import resultLogic from '../resultLogic';

const ResultDiv = style.div`{
  text-align:center;
  margin-top: 4em;
}`;

function Result() {
  const [username, setUsername] = useState('');
  const [resultManager, setResultManager] = useState({});
  const [stats, setStats] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sessionKey } = useParams();
  const [loaded, setLoaded] = useState(false);
  const maxRank = 20;

  useEffect(() => {
    resultLogic.loadResources(sessionKey).then((result) => {
      setStats(result.resultStats);
      setResultManager(result.resultManager);
      setLoaded(true);
    });
  }, []);

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit() {
    if (username) {
      resultManager.submitScore(username);
      setIsSubmitted(true);
    }
  }

  return (
    <ResultDiv>
      {!loaded && <p>Loading...</p>}
      {loaded && (
      <div>
        {stats.isInvalid && <p>This session cannot be loaded.</p>}
        {!stats.isInvalid && stats.isDupe && <p>This score has already been submitted.</p>}
        {!stats.isInvalid && !stats.isDupe && !isSubmitted && (
        <div>
          <p>
            {`Your time was ${stats.scoreString}`}
          </p>
          <p>
            {`Your rank on ${stats.levelName} is `}
            {stats.ranking <= maxRank ? `#${stats.ranking}` : `worse than #${maxRank + 1}.`}
          </p>
          <p>Submit your time to the leaderboards:</p>
          <div>
            { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={onChange} />
            <button type="button" onClick={onSubmit}>Submit</button>
          </div>
        </div>
        )}
        {!stats.isInvalid && !stats.isDupe
        && isSubmitted && <p>Your score has been submitted.</p>}
        <Link to="/">Back to Level Select</Link>
      </div>
      )}
    </ResultDiv>
  );
}

export default Result;

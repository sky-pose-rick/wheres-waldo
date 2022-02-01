import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import resultLogic from './resultLogic';

function Result() {
  const [username, setUsername] = useState('');
  const [resultManager, setResultManager] = useState({});
  const [stats, setStats] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sessionKey } = useParams();

  useEffect(() => {
    resultLogic.loadResources(sessionKey).then((result) => {
      setStats(result.resultStats);
      setResultManager(result.resultManager);
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
    <div className="Result">
      {stats.isInvalid && <span>This session cannot be loaded.</span>}
      {!stats.isInvalid && stats.isDupe && <span>This score has already been submitted.</span>}
      {!stats.isInvalid && !stats.isDupe && !isSubmitted && (
      <div>
        <span>
          Your time was
          {' '}
          {stats.scoreString}
        </span>
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={onChange} />
        <button type="button" onClick={onSubmit}>Submit</button>
      </div>
      )}
      {!stats.isInvalid && !stats.isDupe && <span>Your score has been submitted.</span>}
      <Link to="/">Back to Level Select</Link>
    </div>
  );
}

export default Result;

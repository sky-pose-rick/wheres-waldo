import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import resultLogic from './resultLogic';

function Result() {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="Result">
      <span>Invalid Session</span>
      <div>
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={onChange} />
        <button type="button">Submit</button>
      </div>
      <span>Score Submitted</span>
      <Link to="/">Back to Level Select</Link>
    </div>
  );
}

export default Result;

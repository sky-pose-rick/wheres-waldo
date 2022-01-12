import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeLogic from './homeLogic';

function Home() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    homeLogic.loadResources().then((result) => {
      const { resources } = result;
      const levelsCopy = resources.levels.map((level) => {
        const levelCopy = { ...level };
        levelCopy.visible = false;
        return levelCopy;
      });
      setLevels(levelsCopy);
    });
  }, []);

  function toggleVisible(index) {
    const objRefCopy = levels[index];
    objRefCopy.visible = !objRefCopy.visible;
    const arrayCopy = [...levels];
    arrayCopy[index] = objRefCopy;

    setLevels(arrayCopy);
  }

  function makeScore(score) {
    return (
      <tr key={score.scoreKey}>
        <td>
          {score.name}
        </td>
        <td>
          {score.score}
        </td>
      </tr>
    );
  }

  function makeLevel(level, index) {
    return (
      <li key={level.key}>
        <div>
          <Link to={`/play/${level.key}`}>{level.name}</Link>
          <button type="button" onClick={() => toggleVisible(index)}>Toggle Score</button>
        </div>
        {level.visible && (
        <table key={`${level.key}-table`}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              level.scores.map((score) => makeScore(score))
            }
          </tbody>
        </table>
        )}
      </li>
    );
  }

  return (
    <div className="Home">
      <ul>
        {
          levels.map((level, index) => makeLevel(level, index))
        }
      </ul>
    </div>
  );
}

export default Home;

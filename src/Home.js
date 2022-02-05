import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from 'styled-components';
import homeLogic from './homeLogic';

const HomeUL = style.ul`{
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  & li{
    margin: 0.2em;
  }
  & li div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & table {
    background: black;
    margin: auto;
  }
  & thead {
    text-align: center;
    background: gray
  }
  & tbody {
    background: white;
  }
}`;

const HomeLink = style(Link)`{
  color: black;
  text-decoration-line: none;
  border: solid 5px #57ffab;
  font-size: 2em;
  background-color: #569565;
  padding: 0.3em 0.3em;
  width: 10em;
  text-align: center;
}`;

const TimeCol = style.td`{
  text-align:right;
}`;

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

  function makeScore(score, rank) {
    return (
      <tr key={score.scoreKey}>
        <td>
          {rank}
        </td>
        <td>
          {score.name}
        </td>
        <TimeCol>
          {score.score}
        </TimeCol>
      </tr>
    );
  }

  function makeLevel(level, index) {
    return (
      <li key={level.key}>
        <div>
          <HomeLink to={`/play/${level.key}`}>{level.name}</HomeLink>
          <button type="button" onClick={() => toggleVisible(index)}>Toggle Score</button>
        </div>
        {level.visible && (
        <table key={`${level.key}-table`}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              level.scores.map((score, scoreIndex) => makeScore(score, scoreIndex + 1))
            }
          </tbody>
        </table>
        )}
      </li>
    );
  }

  return (
    <div>
      <HomeUL>
        {
          levels.map((level, index) => makeLevel(level, index))
        }
      </HomeUL>
    </div>
  );
}

export default Home;

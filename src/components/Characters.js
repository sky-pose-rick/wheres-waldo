import React from 'react';
import propTypes from 'prop-types';
import style from 'styled-components';

const CharacterList = style.ul`{
  list-style: none;
  display: flex;
  padding-left: 0px;

  & li{
    display: flex;
    flex-direction: column;
    margin: 0px 20px;
    text-align: center;
  }

  & li.found{
    filter: grayscale();
    text-decoration-line: line-through;
  }

  & img{
    width: 75px;
    margin: auto;
  }
}`;

function Target({ chars }) {
  const entryArray = Object.entries(chars);

  return (
    <div className="Characters">
      <CharacterList>
        {entryArray.map((entry) => (
          <li key={entry[0]} className={entry[1].found ? 'found' : ''}>
            <img src={entry[1].src} alt="" />
            <span>{entry[1].label}</span>
          </li>
        ))}
      </CharacterList>
    </div>
  );
}

Target.propTypes = {
  chars: propTypes.objectOf(propTypes.shape({
    label: propTypes.string,
    found: propTypes.bool,
    src: propTypes.string,
  })),
};

Target.defaultProps = {
  chars: {},
};

export default Target;

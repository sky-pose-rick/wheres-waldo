import React from 'react';
import propTypes from 'prop-types';

function Target({ chars }) {
  const entryArray = Object.entries(chars);

  return (
    <div className="Characters">
      <ul>
        {entryArray.map((entry) => (
          <li key={entry[0]} className={entry[1].found ? 'found' : ''}>
            <img src={entry[1].src} alt="" />
            <span>{entry[1].label}</span>
          </li>
        ))}
      </ul>
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

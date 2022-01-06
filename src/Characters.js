import React from 'react';
import PropTypes from 'prop-types';

function Target({ chars }) {
  return (
    <div className="Characters">
      <ul>
        {chars.map((char) => (
          <li key={char.key}>
            <img src={char.src} alt="" />
            <span>{char.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

Target.propTypes = {
  chars: PropTypes.arrayOf(Object),
};

Target.defaultProps = {
  chars: [],
};

export default Target;

import React from 'react';
import PropTypes from 'prop-types';

import './Target.css';

function Target(props) {
  const {
    chars, xOffset, yOffset, onSelect,
  } = props;

  // validate data when using in-line styles
  const style = { top: yOffset || 0, left: xOffset || 0 };

  return (
    <div className="Target">
      <div className="TargetRelative" style={style}>
        <div className="TargetBox" />
        <ul>
          {chars.map((char) => (
            <li key={char.key}>
              <button
                type="button"
                onClick={() => {
                  onSelect(char.key);
                }}
              >
                {char.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Target.propTypes = {
  chars: PropTypes.arrayOf(Object),
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  onSelect: PropTypes.func,
};

Target.defaultProps = {
  chars: [],
  xOffset: 0,
  yOffset: 0,
  onSelect: null,
};

export default Target;

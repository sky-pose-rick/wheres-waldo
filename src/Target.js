import React from 'react';
import PropTypes, { defaultProps, object } from 'prop-types';

function Target(props) {
  const {
    chars, xOffset, yOffset, onSelect,
  } = props;

  return (
    <div className="Target">
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

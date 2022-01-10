import React from 'react';
import propTypes from 'prop-types';

import './Target.css';

function Target(props) {
  const {
    chars, pos, onSelect,
  } = props;

  // validate data when using in-line styles
  const style = { top: pos.y || 0, left: pos.x || 0 };

  const targetsToShow = Object.entries(chars).filter((entry) => !entry[1].found);

  return (
    <div className="Target">
      <div className="TargetRelative" style={style}>
        <div className="TargetBox" />
        <ul>
          {targetsToShow.map((entry) => (
            <li key={entry[0]}>
              <button
                type="button"
                onClick={() => {
                  onSelect(entry[0]);
                }}
              >
                {entry[1].label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Target.propTypes = {
  chars: propTypes.objectOf(propTypes.shape({ label: propTypes.string, found: propTypes.bool })),
  pos: propTypes.shape({ x: propTypes.number, y: propTypes.number }),
  onSelect: propTypes.func,
};

Target.defaultProps = {
  chars: {},
  pos: { x: 0, y: 0 },
  onSelect: null,
};

export default Target;

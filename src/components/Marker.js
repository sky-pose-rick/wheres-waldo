import React from 'react';
import propTypes from 'prop-types';

function Target({ pos }) {
  const style = { top: pos.y || 0, left: pos.x || 0 };

  return (
    <div className="Marker" style={style} data-testid="marker" />
  );
}

Target.propTypes = {
  pos: propTypes.shape({
    x: propTypes.number.isRequired,
    y: propTypes.number.isRequired,
  }).isRequired,
};

export default Target;

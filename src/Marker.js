import React from 'react';
import PropTypes from 'prop-types';

function Target({ pos }) {
  const style = { top: pos.y || 0, left: pos.x || 0 };

  return (
    <div className="Marker" style={style} data-testid="marker" />
  );
}

Target.propTypes = {
  pos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Target;

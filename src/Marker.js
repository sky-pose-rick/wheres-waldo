import React from 'react';
import PropTypes from 'prop-types';

function Target(props) {
  const {
    xOffset, yOffset,
  } = props;

  return (
    <div className="Marker" />
  );
}

Target.propTypes = {
  xOffset: PropTypes.number.isRequired,
  yOffset: PropTypes.number.isRequired,
};

export default Target;

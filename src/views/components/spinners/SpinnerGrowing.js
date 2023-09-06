import React from 'react';
import { Spinner } from 'reactstrap';

const SpinnerGrowing = () => {
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Set the height to the full viewport height
  };

  const customSpinnerStyle = {
    width: '100px', // Set the width to increase the spinner size
    height: '100px', // Set the height to increase the spinner size
  };

  return (
    <div style={spinnerContainerStyle}>
      <Spinner style={customSpinnerStyle} type="grow" />
    </div>
  );
};

export default SpinnerGrowing;

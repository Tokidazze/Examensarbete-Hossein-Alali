import React from 'react';
import spinnerPacman from './pacman.gif';
import spinnerWedge from './spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinnerPacman}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  );
};

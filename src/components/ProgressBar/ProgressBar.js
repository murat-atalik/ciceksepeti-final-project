import './progressBar.scss';

import React from 'react';

function ProgressBar({ progress }) {
  const fillerStyles = {
    width: `${progress}%`,
  };

  return (
    <div className="progressbar-wrapper">
      <div className="progressbar-container">
        <div className="progressbar-percent">
          <p>{`${progress}%`}</p>
        </div>
        <div className="progressbar-slider-background">
          <div className="progressbar-slider-percent" style={fillerStyles} />
        </div>
        <p className="progressbar-loading">Yükleniyor</p>
      </div>
    </div>
  );
}

export default ProgressBar;

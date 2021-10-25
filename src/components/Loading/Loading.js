import './loading.scss';

import Header from 'components/Header/Header';
import React from 'react';

function Loading() {
  return (
    <>
      <Header />
      <div className="loading">
        <div className="loading-body">
          <div className="loading-inner">
            <div className="loading-inner-2" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;

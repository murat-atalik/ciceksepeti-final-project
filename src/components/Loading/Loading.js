import './loading.scss';

import React from 'react';

import Header from '../Header/Header';

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

import './toggleSwitch.scss';

import React from 'react';

function ToggleSwitch({ toggle, switchToggle }) {
  const setSwitchToggle = () => {
    switchToggle(!toggle);
  };
  return (
    <>
      <div className="toggle-switch">
        <p>Fiyat ve teklif opsiyonu</p>
        <div
          className={
            toggle ? 'toggle-switch-slider-on' : 'toggle-switch-slider-off'
          }
          onClick={setSwitchToggle}
          aria-hidden="true"
        >
          <div className={toggle ? 'toggle-switch-on' : 'toggle-switch-off'} />
        </div>
      </div>
    </>
  );
}

export default ToggleSwitch;

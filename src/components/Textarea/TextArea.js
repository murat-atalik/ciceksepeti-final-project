import './textArea.scss';

import React from 'react';

function TextArea({ id, title, placeholder, value, setValue, theme, ...rest }) {
  return (
    <>
      <div className="textarea-container" {...rest}>
        <label htmlFor={id}>{title}</label>
        <textarea
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={
            theme ? 'textarea-description-err' : 'textarea-description'
          }
        />
      </div>
    </>
  );
}

export default TextArea;

import './listBox.scss';

import arrow from 'assests/Path14450.svg';
import warnArrow from 'assests/Path14450-warn.svg';

function ListBox({
  list,
  title,
  body,
  selected,
  setSelected,
  toggle,
  setToggle,
  theme,
  closeAllList,
}) {
  const setItem = (item) => {
    setSelected(item);
    setToggle(!toggle);
  };
  return (
    <div>
      <p
        className="list-box-title"
        onClick={() => setToggle(!toggle)}
        aria-hidden="true"
      >
        {title}
      </p>
      <div
        className={toggle ? `list-box-toggle ${theme}` : `list-box ${theme}`}
      >
        <div
          className="list-box-btn"
          onClick={() => setToggle(!toggle)}
          aria-hidden="true"
        >
          {selected.title.length > 0 ? selected.title : body}
          <img
            className={toggle ? 'arrow-open' : 'arrow-close'}
            src={theme === 'warning' ? warnArrow : arrow}
            alt="arrow"
          />
        </div>
        {toggle && (
          <div className="content-wrapper" onMouseLeave={() => closeAllList()}>
            <p>{body}</p>
            <div className="list-box-content">
              {list.map((item) => (
                <div
                  key={item.id}
                  className="list-box-item"
                  onClick={() => setItem(item)}
                  aria-hidden="true"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListBox;

import './paginate.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Paginate({ pages, currentPage, setCurrentPage, params }) {
  const [pageNumbers, setPageNumbers] = useState([]);
  const history = useHistory();
  const path = window.location.pathname;
  useEffect(() => {
    if (pages > 0 && pageNumbers.length !== pages) {
      setPageNumbers([]);
      for (let i = 1; i <= pages; i += 1) {
        setPageNumbers((prev) => [...prev, i]);
      }
    }
  }, [pageNumbers.length, pages]);
  const previousPage = () => {
    setCurrentPage((prev) => prev - 1);
    params.set('page', currentPage - 1);
    history.push({ pathname: path, search: params.toString() });
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    params.set('page', currentPage + 1);
    history.push({ pathname: path, search: params.toString() });
  };
  const changePage = (value) => {
    setCurrentPage(value);
    params.set('page', value);
    history.push({ pathname: path, search: params.toString() });
  };
  return (
    <>
      <div className="paginate-buttons">
        <button
          onClick={() => currentPage !== 1 && previousPage()}
          type="button"
          className={currentPage === 1 ? 'deactive-page' : 'prev-page'}
          aria-label="previous-page"
        >
          {currentPage !== 1 && `<<`}
        </button>
        <div className="paginate-numbers">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              type="button"
              className={page === currentPage ? 'active-page' : 'default-page'}
              aria-label={`page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => currentPage !== pages && nextPage()}
          type="button"
          className={currentPage === pages ? 'deactive-page' : 'next-page'}
          aria-label="next-page"
        >
          {currentPage === pages ? 'Son' : `>>`}
        </button>
      </div>
    </>
  );
}

export default Paginate;

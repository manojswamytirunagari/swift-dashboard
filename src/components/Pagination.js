import React from "react";

const Pagination = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  const prevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const visiblePages = [];
  if (currentPage > 1) visiblePages.push(currentPage - 1);
  visiblePages.push(currentPage);
  if (currentPage < totalPages) visiblePages.push(currentPage + 1);

  return (
    <div className="pagination pagination-right">
      <button onClick={prevPage} disabled={currentPage === 1}>
        {"<"}
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={nextPage} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

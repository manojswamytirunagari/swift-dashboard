import React from "react";

const SortableHeader = ({ label, sortKey, sortConfig, onSort }) => {
  let sortIndicator = "";
  if (sortConfig.key === sortKey) {
    sortIndicator = sortConfig.direction === "asc" ? "↑" : "↓";
  }

  return (
    <div className="sort-box" onClick={() => onSort(sortKey)}>
      {label} {sortIndicator}
    </div>
  );
};

export default SortableHeader;

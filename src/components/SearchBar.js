import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by name, email, or comment"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ margin: "1rem 0", padding: "8px", width: "300px" }}
  />
);

export default SearchBar;

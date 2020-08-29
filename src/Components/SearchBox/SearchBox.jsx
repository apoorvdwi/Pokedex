import React from "react";

import "./SearchBox.css";

const SearchBox = ({ placeholder, handleChange, value }) => (
  <input
    className="search"
    type="search"
    placeholder={placeholder}
    onChange={handleChange}
    value={value}
  />
);

export default SearchBox;

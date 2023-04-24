import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  console.log("got here");
  const [searchInput, setSearchInput] = useState("");

  console.log("got here1");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  console.log("got here2");

  var searchResults = [];

  console.log("got here3");
  console.log(searchInput);
  console.log("PREVIOUS LINE");

  for (var i = 0; i < props.filterInfo.length; i++) {
    var currentCard = props.filterInfo[i]; // current info
    var string = JSON.stringify(currentCard);
    if (string.includes(searchInput)) {
      searchResults.push(currentCard);
    }
  }

  // props.setFilterInfo(searchResults);

  return (
    <div className="search-bar">
      <input
        id="hpsearch"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
};

export default SearchBar;

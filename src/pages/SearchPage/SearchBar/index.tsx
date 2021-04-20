import React, { FC } from "react";
import { Search as SearchIcon } from "../Icons";
import "./SearchBar.css";

type SearchBarProps = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onChange, placeholder }) => {
  return (
    <div className="Search">
      <input
        className="SearchInput"
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className="SearchSpan">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;

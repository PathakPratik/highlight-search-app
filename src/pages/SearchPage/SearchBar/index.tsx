import React, { FC } from "react";
import { Search as SearchIcon } from "../Icons";
import "./SearchBar.css";
import debounce from "../../../helpers/debounce";
import { search } from "./utils";
import { MusicData } from "../index";

type SetMusicData = React.Dispatch<
  React.SetStateAction<SearchBarProps["data"]>
>;

type SearchBarProps = {
  placeholder?: string;
  data: MusicData;
  setMusicData: SetMusicData;
};

type OnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  data: MusicData,
  setMusicData: SetMusicData
) => void;

const onChange: OnChange = (e, data, setMusicData) => {
  const term = e.target.value;
  if (term !== "") {
    const searchCopy = JSON.parse(JSON.stringify(data));
    const searchResult = search(searchCopy, term.trim());
    setMusicData(searchResult);
  } else {
    setMusicData(data);
  }
};

const SearchBar: FC<SearchBarProps> = ({ placeholder, data, setMusicData }) => {
  return (
    <div className="Search">
      <input
        className="SearchInput"
        type="text"
        onChange={(e) => debounce(() => onChange(e, data, setMusicData), 300)}
        placeholder={placeholder}
      />
      <span className="SearchSpan">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;

import React, { FC } from "react";
import { Search as SearchIcon } from "../Icons";
import "./SearchBar.css";
import debounce from "../../../helpers/debounce";
import { search } from "./utils";
import { MusicData } from "../index";
import { Option } from "./utils";

type SetMusicData = React.Dispatch<
  React.SetStateAction<SearchBarProps["data"]>
>;

type SearchBarProps = {
  placeholder?: string;
  data: MusicData;
  setMusicData: SetMusicData;
  option: Option;
};

type OnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  data: MusicData,
  setMusicData: SetMusicData,
  option: Option
) => void;

const onChange: OnChange = (e, data, setMusicData, option) => {
  const term = e.target.value;
  if (term !== "") {
    const searchCopy = JSON.parse(JSON.stringify(data));
    const searchResult = search(searchCopy, term.trim(), option);
    setMusicData(searchResult);
  } else {
    setMusicData(data);
  }
};

const SearchBar: FC<SearchBarProps> = ({
  option,
  placeholder,
  data,
  setMusicData,
}) => {
  return (
    <div className="Search">
      <input
        className="SearchInput"
        type="text"
        onChange={(e) =>
          debounce(() => onChange(e, data, setMusicData, option), 300)
        }
        placeholder={placeholder}
      />
      <span className="SearchSpan">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;

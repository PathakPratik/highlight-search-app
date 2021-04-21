import React, { useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import dataRaw from "./CardDataset.json";
import OptionSelection from "react-multi-select-component";
import "./SearchPage.css";

const {
  sections: [{ assets: data }],
} = dataRaw;

export type MusicData = typeof data;

const options = [
  { label: "Title", value: "title" },
  { label: "Description", value: "description" },
  { label: "Keywords", value: "keywords" },
];

const SearchPage = () => {
  const [musicData, setMusicData] = useState<MusicData>(data);
  const [option, setOption] = useState<any>(options);

  const optionArr = option.map((each: typeof options[number]) => each.value);
  console.log(optionArr);
  return (
    <div className="Container">
      <div className="InputsWrap">
        <OptionSelection
          overrideStrings={{ allItemsAreSelected: "All" }}
          disableSearch
          options={options}
          value={option}
          onChange={setOption}
          labelledBy="Select"
        />
        <SearchBar
          data={data}
          option={optionArr}
          setMusicData={setMusicData}
          placeholder="start typing..."
        />
      </div>
      {musicData.map(
        ({ title, description, supplement_information: duration }, i) => (
          <Card
            key={i}
            title={title}
            description={description ? description[0] : ""}
            duration={duration ? duration[0] : ""}
          />
        )
      )}
    </div>
  );
};

export default SearchPage;

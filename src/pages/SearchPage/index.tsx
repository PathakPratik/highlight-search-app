import React, { useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import dataRaw from "./CardDataset.json";

const {
  sections: [{ assets: data }],
} = dataRaw;

export type MusicData = typeof data;

const SearchPage = () => {
  const [musicData, setMusicData] = useState<MusicData>(data);

  return (
    <div style={{padding: '1rem'}}>
      <SearchBar
        data={data}
        setMusicData={setMusicData}
        placeholder="start typing..."
      />
      {musicData.map(
        ({ title, description, supplement_information: duration }, i) => (
          <Card
            key={i}
            title={title}
            description={description[0]}
            duration={duration[0]}
          />
        )
      )}
    </div>
  );
};

export default SearchPage;

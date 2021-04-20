import React from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import cardData from "./cardData.json";

const SearchPage = () => {
  const {
    sections: [{ assets: data }],
  } = cardData;

  return (
    <div style={{ padding: "10px" }}>
      <SearchBar />
      {data.map(
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

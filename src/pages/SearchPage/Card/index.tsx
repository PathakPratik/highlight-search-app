import React, { FC } from "react";
// import { Search as SearchIcon } from '../Icons';
import "./Card.css";

type CardProps = {
  image?: string;
  title: string;
  description: string;
  duration?: string;
  keywords?: string;
};

const Card: FC<CardProps> = ({
  image = "/images/music.webp",
  title,
  description,
  duration,
}) => {
  return (
    <div className="CardWrapper">
      <div className="ImgWrapper">
        <img className="Img" src={image} alt={title} />
      </div>
      <div className="Details">
        <div className="Header">
          <div className="Title">
            <b>{title}</b>
          </div>
        </div>
        <div className="Duration">
          <i>{duration}</i>
        </div>
        <div
          className="Description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div>
          <u>Play Vocal</u>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <u>Lyrics (PDF)</u>
        </div>
      </div>
    </div>
  );
};

export default Card;

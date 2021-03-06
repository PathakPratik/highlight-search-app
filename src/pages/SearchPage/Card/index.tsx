import React, { FC } from "react";
import "./Card.css";

type CardProps = {
  image?: string;
  title: string;
  description: string;
  duration?: string;
  keywords?: string;
};

const imgUrl = process.env.PUBLIC_URL + '/images/music.webp';

const Card: FC<CardProps> = ({
  image = imgUrl,
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
            <b dangerouslySetInnerHTML={{ __html: title }} />
          </div>
        </div>
        <div className="Duration">
          <i>{duration}</i>
        </div>
        <div
          className="Description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="Play">
          <u>Play Vocal</u>
        </div>
        <div className="Lyrics">
          <u>Lyrics (PDF)</u>
        </div>
      </div>
    </div>
  );
};

export default Card;

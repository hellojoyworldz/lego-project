import React from "react";
import "./ProfileImage.style.css";

const ProfileImage = ({ className, size = 48 }) => {
  const styleName = [
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "bottts",
    "croodles",
    "croodles-neutral",
    "identicon",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
  ];

  const bgColor = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"];

  const randomChoice = (arrName) =>
    arrName[Math.floor(Math.random() * arrName.length)];

  const randomStyleName = randomChoice(styleName);
  const randomBgColor = randomChoice(bgColor);

  return (
    <div className={className}>
      <div className="profileimage_thumb">
        <img
          src={`https://api.dicebear.com/8.x/${randomStyleName}/svg?backgroundColor=${randomBgColor}&size=${size}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileImage;

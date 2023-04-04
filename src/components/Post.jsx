import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const document = props.document;

  // post title
  const PostTitle = document.itemTitle;

  // first caption
  const firstCaption = document.address ? document.address : document.title;

  // second caption
  let bdrms = document.numBedrooms;
  let bthrms = document.numBathrooms;
  var secondCaption = "";

  // Changed if statement here to reflect they are both not null -> &&
  if (bdrms && bthrms) {
    secondCaption = String(bdrms) + " bed " + String(bthrms) + " bath";
  } else {
    secondCaption = document.itemType;
  }

  // first image
  const firstImage = document.images[0];

  return (
    <Link className="post" to="/listing" state={props}>
      <img src={firstImage} />
      <div className="text">
        <h2>{PostTitle}</h2>
        <p className="caption1">{firstCaption}</p>
        <p className="caption2">{secondCaption}</p>
      </div>
    </Link>
  );
};

export default Post;

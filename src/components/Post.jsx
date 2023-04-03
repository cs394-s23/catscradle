import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const document = props.props;

  // post title
  const PostTitle = document.itemType;

  // first caption
  const firstCaption = document.address ? document.address : document.title;

  // second caption
  let bdrms = document.numBedrooms;
  let bthrms = document.numBathrooms;
  var secondCaption = "";

  if (bdrms & bthrms) {
    secondCaption = String(bdrms) + " bed " + String(bthrms) + " bath";
  } else {
    secondCaption = document.title;
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

import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = (props) => {
  const firstCaption = props.document.address
    ? props.document.address
    : props.document.title;

  let bdrms = props.document.numBedrooms;
  let bthrms = props.document.numBathrooms;
  var secondCaption = "";

  if (bdrms & bthrms) {
    secondCaption = String(bdrms) + " bed" + String(bthrms) + " bath";
  } else {
    secondCaption = props.document.title;
  }

  return (
    <Link className="post" to="/listing" state={props.document}>
      <img src={postImage} />
      <div className="text">
        <h2>{props.document.itemType}</h2>
        <p className="caption1">{firstCaption}</p>
        <p className="caption2">{secondCaption}</p>
      </div>
    </Link>
  );
};

export default Post;

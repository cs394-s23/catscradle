import React from "react";
import "./Post.css";

const Post = ({ postImage, postType, Address, Caption }) => {
  return (
    <div className="post">
      <img src={postImage} />
      <div className="text">
        <h2>{postType}</h2>
        <p className="caption1">{Address}</p>
        <p className="caption2">{Caption}</p>
      </div>
    </div>
  );
};

export default Post;

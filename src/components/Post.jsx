import React from "react";
import "./Post.css";

const Post = ({ postImage, postType, Address, Caption }) => {
  return (
    <div className="post">
      <img src={postImage} />
      <div className="text">
        <h2>{postType}</h2>
        <p>{Address}</p>
        <p>{Caption}</p>
      </div>
    </div>
  );
};

export default Post;

import React from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";

const Post = ({ postImage, postType, Address, Caption }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/listing");
  };
  return (
    <div className="post" onClick={handleClick}>
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

import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../images/paw.jpeg";

import Apt from "../images/apt.jpg";
import Rack from "../images/shoe-rack.jpg";

const Homepage = () => {
  return (
    <div className="homePage">
      <div className="logo">
        <p>
          CatsCradle
          <span>
            <img src={logo} />
          </span>
        </p>
      </div>

      {/* search bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>

      {/* buttons */}
      <div className="buttons">
        <button>All</button>
        <button>Property</button>
        <button>Furniture</button>
      </div>

      {/* Listings */}
      <div className="listings">
        <Post
          postImage={Apt}
          postType={"Property"}
          Address={"1811 Sherman Abve 60201"}
          Caption={"1 bed 1 bath"}
        />
        <Post
          postImage={Rack}
          postType={"Furniture"}
          Address={"1811 Sherman Abve 60201"}
          Caption={"IKEA shoe rack"}
        />
        <Post
          postImage={Apt}
          postType={"Property"}
          Address={"1811 Sherman Abve 60201"}
          Caption={"2 bed 3 bath"}
        />
      </div>
    </div>
  );
};

export default Homepage;

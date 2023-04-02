import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../images/paw.jpeg";
import { useNavigate } from "react-router-dom";

import Apt from "../images/apt.jpg";
import Rack from "../images/shoe-rack.jpg";

const Homepage = () => {
  let navigate = useNavigate();
  const routeToListings = () => {
    let path = "/listings";
    navigate(path);
  };

  return (
    <div className="root">
      <div className="homePage">
        {/* logo and app name */}
        <div className="logo">
          <p>
            <span>CatsCradle</span>
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
        <div className="buttons-list">
          <div className="buttons">
            <button>All</button>
            <button>Property</button>
            <button>Furniture</button>
          </div>
        </div>

        {/* Listings */}
        <div className="listings">
          <Post
            onClick={routeToListings}
            postImage={Apt}
            postType={"Property"}
            Address={"1811 Sherman Abve 60201"}
            Caption={"1 bed 1 bath"}
          />
          <Post
            onClick={routeToListings}
            postImage={Rack}
            postType={"Furniture"}
            Address={"1811 Sherman Abve 60201"}
            Caption={"IKEA shoe rack"}
          />
          <Post
            onClick={routeToListings}
            postImage={Apt}
            postType={"Property"}
            Address={"1811 Sherman Abve 60201"}
            Caption={"2 bed 3 bath"}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../images/paw.jpeg";

const Homepage = (props) => {
  const documents = props.props.documents;

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
          {documents.map((obj, index) => (
            <Post props={obj} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

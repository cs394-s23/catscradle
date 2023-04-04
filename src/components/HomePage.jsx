import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../images/paw.jpeg";
import db from '../..//firebase.js';
import { useState, useReducer } from 'react';

const Homepage = () => {

  // Consts and functions for the homePage
  const [info , setInfo] = useState([]);

  // ********** HELPER FUNCTIONS **********

	// Fetch the required data using the get() method
  // Made this into an asynchronous function in order to allow the data to be fetched before it is used
	const Fetchdata = async(filterType) =>{
      try {

        var querySnapshot = null;

        if (filterType == null) {
          querySnapshot = await db.collection("Properties").get();
        } else {
          querySnapshot = await db.collection("Properties").where("itemType", "==", filterType).get();
        }

        // Loop through the data and store it in ARRAY to display
        querySnapshot.forEach(element => {
          var data = element.data();
          setInfo(arr => [...arr , data]);
        });
      } catch (error) {
        console.log(error);
      }
  }

  const FilterData = async(filterType) => {
    document.getElementById("HPListings").innerHTML = "";
    Fetchdata(filterType);
  }

  // Start the fetch operation as soon as the page loads
	window.addEventListener('load', () => {
		Fetchdata();
	});

  // HTML returns
  return (
    <div className="root">
      <div className="homePage">
        {/* logo and app name */}
        <div className="logo">
          <p>
            <span style={{ fontSize: "40px" }}>CatsCradle</span>
            <span style={{ marginLeft: "5px" }}>
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
            <button onClick={FilterData.bind(this, null)}>All</button>
            <button onClick={FilterData.bind(this, "Property")}>Property</button>
            <button onClick={FilterData.bind(this, "Furniture")}>Furniture</button>
          </div>
        </div>

        {/* Listings */}
        <div className="listings" id="HPListings">
          {info.map((obj, index) => (
            <Post document={obj} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../../images/paw.jpeg";
import db from "../../..//firebase.js";
import { useState, useReducer } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  // Consts and functions for the homePage
  const [info, setInfo] = useState([]);

  // ********** HELPER FUNCTIONS **********

  // Fetch the required data using the get() method
  // Made this into an asynchronous function in order to allow the data to be fetched before it is used
  const Fetchdata = async (filterType) => {
    try {
      var querySnapshot = null;

      if (filterType == null) {
        querySnapshot = await db.collection("Properties").get();
      } else if (Array.isArray(filterType)) {
        if (filterType.length == 3){
          querySnapshot = await db
          .collection("Properties")
          .where("numBathrooms", "==", filterType[1])
          .where("numBedrooms", "==", filterType[0])
          .get();
        }
        else{
          console.log(filterType)
          querySnapshot = await db
          .collection("Properties")
          .where("price", ">=", parseInt(filterType[0]))
          .where("price", "<=", parseInt(filterType[1]))
          .get();
        }
        
      } else if (filterType == "Property") {
        querySnapshot = await db
          .collection("Properties")
          .where("itemType", "==", filterType)
          .get();
      } 

      else if (filterType == "Furniture"){
        querySnapshot = await db
          .collection("Properties")
          .where("itemType", "==", filterType)
          .get();
      }
      else {
        querySnapshot = await db
          .collection("Properties")
          .where("type", "==", filterType)
          .get();
        // console.log(querySnapshot);
      }

      // Loop through the data and store it in ARRAY to display
      querySnapshot.forEach((element) => {
        var data = element.data();
        // console.log(data);
        setInfo((arr) => [...arr, data]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const FilterData = async (filterType) => {
    document.getElementById("HPListings").innerHTML = "";
    Fetchdata(filterType);
  };

  // Start the fetch operation as soon as the page loads
  window.addEventListener("load", () => {
    Fetchdata();
  });

  const getInputValue = async () => {
    var bedroomNum = document.getElementById("bedroom").value;
    var bathroomNum = document.getElementById("bathroom").value;
    var filterType = [bedroomNum, bathroomNum, 0];
    FilterData(filterType);
  };

  const getPrice = async () => {
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;
    var filterType = [min, max];
    FilterData(filterType);
  };

  // logout
  const handleLogOut = (event) => {
    localStorage.clear();
  };

  return (
    <div className="root">
      <div className="homePage">
        {/* profile picture */}

        {/* logo and app name */}

        <div className="hplogo">
          <p>
            <span style={{ fontSize: "40px" }}>CatsCradle</span>
            <span style={{ marginLeft: "5px" }}>
              <img src={logo} />
            </span>
          </p>

          <Link className="To_upload_button" to="/upload">
            <h4> ⬆️ Upload </h4>
          </Link>

          <div className="profile-stuff">
            <span className="profile-pic">
              <img
                src={localStorage.getItem("photo")}
                className="profile-img"
              />
            </span>

            <Link to="/login" onClick={handleLogOut} className="sign-out">
              Sign out
            </Link>
          </div>
        </div>

        {/* search bar */}
        <div className="search-bar">
          <input id="hpsearch" type="text" placeholder="Search" />
        </div>

        {/* buttons */}
        <div className="buttons-list">
          <div className="buttons">
            <button onClick={FilterData.bind(this, null)}>All</button>
            <div className="dropdown">
              <button onClick={FilterData.bind(this, "Property")}>
                Property
              </button>
              <div className="dropdown-input">
                <div className="container">
                  <input type="text" id="bedroom" name="bedroom" autocomplete="off" className="inputBox"/>
                  &nbsp;
                  <b className="room">Bedroom</b>&nbsp;
                  <input type="text" id="bathroom" name="bathroom" autocomplete="off" className="inputBox"/>
                  &nbsp;
                  <b className="room">Bathroom</b>&nbsp;
                  <button onClick={getInputValue}>Find</button>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={FilterData.bind(this, "Furniture")}
              >
                Furniture
              </button>
              <div className="dropdown-content">
                <button 
                  onClick={FilterData.bind(this, "livingRoom")}
                >
                  Living Room
                </button>
                <button onClick={FilterData.bind(this, "dining")}>
                  Dining
                </button>
                
              </div>
            </div>
            {/* <div className="dropdown">
              <button>Price</button>
              <div className="dropdown-input">
                <div className="container">
                  <b>Minimum</b>&nbsp;
                  <input type="text" id="min" name="min" autocomplete="off" className="inputBox"/>
                  &nbsp;
                  <b>Maximum</b>&nbsp;
                  <input type="text" id="max" name="max" autocomplete="off" className="inputBox"/>
                  &nbsp;
                  <button onClick={getPrice}>Find</button>
                </div>
              </div>
            </div> */}
            
          </div>
        </div>

        {/* Listings */}
        <div className="listings" id="HPListings">
          {info.map((obj, index) => (
            <Post document={obj} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

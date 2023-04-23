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
  const [filterInfo, setFilterInfo] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  // Filters variables
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [bathroomFilter, setBathroomFilter] = useState("");
  const [furnitureType, setFurnitureType] = useState("");

  // logout
  const handleLogOut = (event) => {
    localStorage.clear();
  };

  // ********** HELPER FUNCTIONS **********

  // Fetch the required data using the get() method
  // Made this into an asynchronous function in order to allow the data to be fetched before it is used
  const Fetchdata = async () => {

    setDataFetched(true);
    console.log("Fetching data...");

    try {
      var querySnapshot = null;
      querySnapshot = await db.collection("Properties").get();

      // Loop through the data and store it in ARRAY to display
      querySnapshot.forEach((element) => {
        var data = element.data();
        // console.log(data);
        setInfo((arr) => [...arr, data]);
        setFilterInfo((arr) => [...arr, data]);
      });
    } catch (error) {
      console.log(error);
    }

  };

  // Filtering data
  const FilterData = () => {

    var nextFilterInfo = [];


    for (var i = 0; i < info.length; i++){

      var currentCard = info[i];

      // Filter in all different directions
      // 1. Filter room counts (bedroom and bathroom)
      var roomBool = bathroomFilter == "" || bathroomFilter == null|| currentCard.numBathrooms == bathroomFilter;
      var bedBool = bedroomFilter == "" || bedroomFilter == null || currentCard.numBedrooms == bedroomFilter;

      // 2. Filter by furnite type
      var isType = furnitureType == "" || currentCard.itemType.toLowerCase() == furnitureType.toLowerCase();

      // 3. Filter by price

      console.log("Info Card: ", i);
      console.log(furnitureType.toLowerCase()=="");
      console.log(currentCard.itemType.toLowerCase(), furnitureType.toLowerCase(), furnitureType == "" && currentCard.itemType.toLowerCase() == furnitureType.toLowerCase())
      console.log()

      if (roomBool && bedBool && isType){

        nextFilterInfo.push(currentCard);

      }

      console.log(currentCard.numBathrooms);
    }

    setFilterInfo(nextFilterInfo);

  };

  const resetData = () => {
    setFilterInfo(info);
  }


  // Always run this on page startup
  // Start the fetch operation as soon as the page loads
  if (!dataFetched){
    Fetchdata();
  }

  // Change values of the states
  const handleNumBathroomsChange = (e) => {
    setBathroomFilter(e.target.value);
  }

  const handleNumBedroomsChange = (e) => {
    setBedroomFilter(e.target.value);
  }

  const handleFurnitureType = (e) => {
    setFurnitureType(e.target.value);
  }


  return (
    <div className="root">
      <div className="homePage">
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
            <button onClick={resetData}>All</button>
            <div className="dropdown">
              <button onClick={FilterData}>
                Property
              </button>
              <div className="dropdown-input">
                <div className="container">
                  <input
                    type="number"
                    value={bedroomFilter}
                    id="bedroom"
                    name="bedroom"
                    autoComplete="off"
                    className="inputBox"
                    onChange={handleNumBedroomsChange}
                  />
                  &nbsp;
                  <b className="room">Bedroom</b>&nbsp;
                  <input
                    type="number"
                    value={bathroomFilter}
                    id="bathroom"
                    name="bathroom"
                    autoComplete="off"
                    className="inputBox"
                    onChange={handleNumBathroomsChange}
                  />
                  &nbsp;
                  <b className="room">Bathroom</b>&nbsp;
                  <button onClick={FilterData}>Find</button>
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
                <button onClick={handleFurnitureType}>
                  Living Room
                </button>
                <button onClick={handleFurnitureType}>
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
          {filterInfo.map((obj, index) => (
            <Post document={obj} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

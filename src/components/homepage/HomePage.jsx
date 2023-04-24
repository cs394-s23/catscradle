import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../../images/paw.jpeg";
import db from "../../..//firebase.js";
import { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Homepage = () => {
  // Consts and functions for the homePage
  const [info, setInfo] = useState([]);
  const [filterInfo, setFilterInfo] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  // Filters variables
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [bathroomFilter, setBathroomFilter] = useState("");
  const [furnitureType, setFurnitureType] = useState(""); // living room or dining room
  const [cardType, setCardType] = useState(""); // property or furniture
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [collectionName, setCollectionName] = useState("ccTesting");

  // logout
  const handleLogOut = (event) => {
    localStorage.clear();
  };

  // ********** HELPER FUNCTIONS **********

  // Fetch the required data using the get() method
  // Made this into an asynchronous function in order to allow the data to be fetched before it is used
  const Fetchdata = async () => {
    setDataFetched(true);

    try {
      var querySnapshot = null;
      querySnapshot = await db.collection(collectionName).get();

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

    for (var i = 0; i < info.length; i++) {
      var currentCard = info[i];

      // Filter in all different directions
      // 1. Filter room counts (bedroom and bathroom)
      var bathroomNull = bathroomFilter == "" || bathroomFilter == null;
      var bedroomNull = bedroomFilter == "" || bedroomFilter == null;
      var bathBool = true;
      var bedBool = true;

      if (typeof currentCard.numBathrooms != "undefined") {
        var bathBool = currentCard.numBathrooms == bathroomFilter;
      }

      if (typeof !currentCard.numBedrooms != "undefined") {
        var bedBool = currentCard.numBedrooms == bedroomFilter;
      }

      // 2. Filter by furnite type
      var furnitureNull = furnitureType == "" || furnitureType == null;
      var furniBool = true;

      if (typeof currentCard.type != "undefined") {
        var furniBool =
          currentCard.type.toLowerCase() == furnitureType.toLowerCase();
      }

      // 3. Filter by Card Type (furniture or property)
      // Will never by null since it is required field
      var cardTypeNull = cardType == "" || cardType == null;
      var cardTypeBool =
        currentCard.itemType.toLowerCase() == cardType.toLowerCase();

      // 4. Filter by price
      var cardPrice = parseInt(currentCard.price);
      var minPriceNull = minPrice == "" || minPrice == null;
      var maxPriceNull = maxPrice == "" || maxPrice == null;
      var priceBool = true;

      var minPriceParsed = parseInt(minPrice);
      var maxPriceParsed = parseInt(maxPrice);

      if (minPriceNull && maxPriceNull) {
        // Do nothing
      } else if (minPriceNull && !maxPriceNull) {
        priceBool = cardPrice <= maxPriceParsed;
      } else if (!minPriceNull && maxPriceNull) {
        priceBool = cardPrice >= minPriceParsed;
      } else {
        priceBool = cardPrice >= minPriceParsed && cardPrice <= maxPriceParsed;
      }

      // 5. Instantiate by Cases
      var roomMatch = (bathroomNull || bathBool) && (bedroomNull || bedBool);
      var furniMatch = furnitureNull || furniBool;
      var priceMatch = priceBool;
      var cardTypeMatch = cardTypeBool || cardTypeNull;

      // 6. Check if all conditions are met
      if (roomMatch && furniMatch && cardTypeMatch && priceMatch) {
        nextFilterInfo.push(currentCard);
      }
    }

    setFilterInfo(nextFilterInfo);
  };

  const resetData = () => {
    // Reset the data
    setFilterInfo(info);

    // Reset the filters
    setBathroomFilter("");
    setBedroomFilter("");
    setFurnitureType("");
    setCardType("");
    setMinPrice("");
    setMaxPrice("");
  };

  // Always run this on page startup
  // Start the fetch operation as soon as the page loads
  if (!dataFetched) {
    Fetchdata();
  }

  // ###################### Change values of the states #######################
  const handleNumBathroomsChange = (e) => {
    setBathroomFilter(e.target.value);
    setCardType("property");
  };

  const handleNumBedroomsChange = (e) => {
    setBedroomFilter(e.target.value);
    setCardType("property");
  };

  const handleFurnitureTypeChange = (e) => {
    setFurnitureType(e.target.innerText);
    setCardType("furniture");
  };

  const handleCardTypeChange = (e) => {
    if (cardType != "") {
      setCardType(e.target.innerText);
    }
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Run the filter function whenever the furniture type changes
  useEffect(() => {
    FilterData();
  }, [furnitureType]);

  return (
    <div className="root">
      <div className="homePage">
        <div className="hplogo">
          <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
            <span style={{ fontSize: "40px", color: "white" }}>CatsCradle</span>
            <span style={{ marginLeft: "5px" }}>
              <img src={logo} />
            </span>
          </div>
        </div>

        <div className="logo-buttons">
          <div style={{ marginRight: "5px", paddingTop: "10px" }}>
            <Link to="/upload" class="upload-button">
              Upload
            </Link>
          </div>

          <div>
            <img src={localStorage.getItem("photo")} />
          </div>

          <div style={{ marginLeft: "5px", paddingTop: "10px" }}>
            <Link class="upload-button" to="/login" onClick={handleLogOut}>
              Sign Out
            </Link>
          </div>
        </div>

        {/* search bar */}
        <SearchBar filterInfo={filterInfo} setFilterInfo={setFilterInfo} />

        {/* buttons */}
        <div className="buttons-list">
          <div className="buttons">
            <button onClick={resetData}>All</button>
            <div className="dropdown">
              <button>Property</button>
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
              <button className="dropbtn" onClick={handleCardTypeChange}>
                Furniture
              </button>
              <div className="dropdown-content">
                <button onClick={handleFurnitureTypeChange}>Living Room</button>
                <button onClick={handleFurnitureTypeChange}>Dining</button>
              </div>
            </div>
            <div className="dropdown">
              <button>Price</button>
              <div className="dropdown-input">
                <div className="container">
                  <b>Minimum</b>&nbsp;
                  <input
                    type="number"
                    value={minPrice}
                    id="min"
                    name="min"
                    autoComplete="off"
                    className="inputBox"
                    onChange={handleMinPriceChange}
                  />
                  &nbsp;
                  <b>Maximum</b>&nbsp;
                  <input
                    type="number"
                    value={maxPrice}
                    id="max"
                    name="max"
                    autoComplete="off"
                    className="inputBox"
                    onChange={handleMaxPriceChange}
                  />
                  &nbsp;
                  <button onClick={FilterData}>Find</button>
                </div>
              </div>
            </div>
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

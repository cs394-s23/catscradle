import React from "react";
import Post from "./Post";
import "./Homepage.css";
import logo from "../../images/paw.jpeg";
import db from "../../..//firebase.js";
import { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

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

  // Search bar related stuff
  const [search, setSearch] = useState("");

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

      if (typeof currentCard.cardCategory != "undefined") {
        var furniBool = currentCard.cardCategory.toLowerCase() == furnitureType.toLowerCase();
      }

      // 3. Filter by Card Type (furniture or property)
      // Will never by null since it is required field
      var cardTypeNull = cardType == "" || cardType == null;
      var cardTypeBool = currentCard.cardType.toLowerCase() == cardType.toLowerCase();
      
      console.log("Card Type: " + currentCard.cardType)
      console.log("Card Type: " + cardType.toLowerCase())

      // 4. Filter by price
      var cardPrice = parseInt(currentCard.monthlyPrice);
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

      console.log("Room Match: " + roomMatch);

      // 6. Check if all conditions are met
      if (roomMatch && furniMatch && cardTypeMatch && priceMatch) {
        nextFilterInfo.push(currentCard);
      }
    }

    setFilterInfo(nextFilterInfo);
  };

  // Search the data
  const searchData = () => {

    console.log("Searching...");

    // Always reset filtering information before searching
    resetData(false);

    var nextFilterInfo = [];

    for (var i = 0; i < info.length; i++) {
      var currentCard = info[i];

      // Filter the items in search
      var searchNull = search == "" || search == null;
      var searchBool = true;

      // Stringify the current card from json -> string
      var currentCardString = JSON.stringify(currentCard);

      // See search tolerance
      searchBool = currentCardString.toLowerCase().includes(search.toLowerCase());

      if (searchNull || searchBool) {
        nextFilterInfo.push(currentCard);
      }
    }

    setFilterInfo(nextFilterInfo);

  };

  const resetData = (resetSearchBool) => {
    // Reset the data
    setFilterInfo(info);

    // Reset the filters
    setBathroomFilter("");
    setBedroomFilter("");
    setFurnitureType("");
    setCardType("");
    setMinPrice("");
    setMaxPrice("");

    if (resetSearchBool) {
      setSearch("");
    }
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
    setCardType(e.target.innerText);

    // Reset some of the filters
    if (e.target.innerText.toLowerCase() == "property") {
      setBathroomFilter("");
      setBedroomFilter("");
    } else if (e.target.innerText.toLowerCase() == "furniture") {
      setFurnitureType("");
    }
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Run the filter function whenever the furniture type changes
  useEffect(() => {
    FilterData();
  }, [furnitureType]);

  // Run the filter function whenever the search input changes
  useEffect(() => {
    searchData();
  }, [search]);

  // Run the filter function whenever the card type changes
  useEffect(() => {
    FilterData();
  }, [cardType]);

  // Run the filter function whenever the bathroom filter changes
  useEffect(() => {
    FilterData();
  }, [bathroomFilter]);

  // Run the filter function whenever the bedroom filter changes
  useEffect(() => {
    FilterData();
  }, [bedroomFilter]);

  // Run the filter function whenever the min price changes
  useEffect(() => {
    FilterData();
  }, [minPrice]);

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
            <Link to="/upload" className="upload-button">
              Upload
            </Link>
          </div>

          <div>
            <img src={localStorage.getItem("photo")} />
          </div>

          <div style={{ marginLeft: "5px", paddingTop: "10px" }}>
            <Link className="upload-button" to="/login" onClick={handleLogOut}>
              Sign Out
            </Link>
          </div>
        </div>

        {/* search bar */}
        <div className="search-bar">
          <input 
            id="hpsearch"
            value={search}  
            onChange={handleSearchChange}
            type="text"
            placeholder="Search" />
        </div>

        {/* buttons */}
        <div className="buttons-list">
          <div className="buttons">
            <button onClick={resetData.bind(this, true)}>All</button>
            <div className="dropdown">
              <button onClick={handleCardTypeChange}>Property</button>
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
                </div>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn" onClick={handleCardTypeChange}>
                Furniture
              </button>
              <div className="dropdown-content">
                <button onClick={handleFurnitureTypeChange}>Living</button>
                <button onClick={handleFurnitureTypeChange}>Dining</button>
                <button onClick={handleFurnitureTypeChange}>Kitchen</button>
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
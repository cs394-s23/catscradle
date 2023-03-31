import React, { useState } from "react";
import "./Listing_details.css";

const Listing_details = (document) => {
  // getting the various properties
  // document.id
  return (
    <div className="Listing_details">
      <div className="Message_box">
        <p>Message Person</p>
      </div>
      <div className="Main_details">
        <ul>Bedrooms: </ul>
        <ul>Baths: </ul>
        <ul>Rent: </ul>
        <ul>Bedrooms: </ul>
        <p>{document.description}</p>
      </div>
      <div className="Amenities">
        <p>Amenities</p>
        {/* iterate through everything in amenities and initialize a ul item */}
        <ul>Item</ul>
      </div>
    </div>
  );
};

export default Listing_details;

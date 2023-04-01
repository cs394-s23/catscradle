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
      <div className="Details_box">
        <div className="Main_details">
          <div className="Basic_info">
            <div>
              <ul>Bedrooms: 1</ul>
              <ul>Baths: 1</ul>
            </div>
            <div>
              <ul>Rent: $1500/month</ul>
              <ul>Rental Period: </ul>
            </div>
          </div>
          {/* replace with {document.description} */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            mattis leo ipsum. Donec pellentesque nibh in nisl scelerisque, in
            aliquam sapien gravida. Mauris eu risus a risus commodo mattis at
            eget neque. Nullam ac faucibus leo, ac cursus eros. Nulla viverra
            justo nec finibus posuere. Cras vitae nibh mi. Aliquam erat
            volutpat.
          </p>
        </div>
        <div className="Amenities">
          <p>Amenities</p>
          {/* iterate through everything in amenities and initialize a ul item */}
          <ul>Item</ul>
          <ul>Item</ul>
        </div>
      </div>
    </div>
  );
};

export default Listing_details;

import React, { useState } from "react";
import "./Listing_details.css";
import phone from "../images/phone.png";

const Listing_details = (props) => {
  const document = props.document;
  if (document.itemType === "Property") {
    return (
      // if else that checks props document type
      <div className="Listing_details">
        <div className="Message_box">
          <p>
            Message {document.seller.name}:{" "}
            <a href="javascript:;">{document.seller.phone}</a>
          </p>
        </div>
        <div className="Details_box">
          <div className="Main_details">
            <div className="Basic_info">
              <div>
                <ul>
                  <b>Bedrooms:</b> {document.numBedrooms}
                </ul>
                <ul>
                  <b>Baths:</b> {document.numBathrooms}
                </ul>
              </div>
              <div>
                <ul>
                  <b>Rent:</b> ${document.price}/month
                </ul>
                <ul>
                  <b>Rental Period:</b> {document.availableFrom} -{" "}
                  {document.availableTo}
                </ul>
              </div>
            </div>
            <p>{document.description}</p>
          </div>
          <div className="Amenities">
            <p>Amenities</p>
            {document.amenities.length > 0 ? (
              document.amenities.map((amenity) => {
                return <li>{amenity}</li>;
              })
            ) : (
              <p>No amenities listed.</p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Listing_details">
        <div className="Message_box">
          <p>
            Message {document.seller.name}:{" "}
            <a href="javascript:;">{document.seller.phone}</a>
          </p>
        </div>
        <div className="Details_box">
          <div className="Main_details">
            <div className="Basic_info">
              <div>
                <ul>
                  <b>Category:</b> {document.category}
                </ul>
                <ul>
                  <b>Condition:</b> {document.condition}
                </ul>
              </div>
              <div>
                <ul>
                  <b>Price:</b> {document.price}
                </ul>
                <ul>
                  <b>Location:</b> {document.address}
                </ul>
              </div>
            </div>
            <p>{document.description}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Listing_details;

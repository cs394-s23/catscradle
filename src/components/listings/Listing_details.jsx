import React, { useState } from "react";
import "./Listing_details.css";

const Listing_details = (props) => {
  const document = props.document;

  console.log(document);
  console.log(document.cardType.toLowerCase() == "property");

  var dateFrom = null;
  var dateTo = null;

  if (document.cardType.toLowerCase() == "property") {
    dateFrom = new Date(document.availableFrom);
    dateTo = new Date(document.availableTo);

    // Format the date as "YYYY-MM-DD"
    dateFrom = dateFrom.toISOString().substring(0, 10);
    dateTo = dateTo.toISOString().substring(0, 10);
  }

  if (document.cardType.toLowerCase() == "property") {
    return (
      // if else that checks props document type
      <div className="Listing_details">
        <div className="Message_box">
          <p>
            Message {document.seller.sellerName}:{" "}
            <a href="javascript:;">{document.seller.sellerPhone}</a>
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
                <ul>
                  <b>Address:</b> {document.address}
                </ul>
              </div>
              <div>
                <ul>
                  <b>Rent:</b> ${document.monthlyPrice}/month
                </ul>
                <ul>
                  <b>Rental Period:</b> {dateFrom} - {dateTo}
                </ul>
              </div>
            </div>
            <div className="Description">
              <p>
                <b>Description</b>
              </p>
              <p>{document.description}</p>
            </div>
          </div>
          <div className="Amenities">
            <p>Amenities</p>
            {(document.amenities && document.amenities.length) > 0 ? (
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
            Message {document.seller.sellerName}:{" "}
            <a href="javascript:;">{document.seller.sellerPhone}</a>
          </p>
        </div>
        <div className="Details_box">
          <div className="Main_details">
            <div className="Basic_info">
              <div>
                <ul>
                  <b>Category:</b> {document.cardCategory}
                </ul>
                <ul>
                  <b>Pickup Location:</b> {document.address}
                </ul>
              </div>
              <div>
                <ul>
                  <b>Price: $</b> {document.monthlyPrice}
                </ul>
              </div>
            </div>
            <div className="Description">
              <p>
                <b>Description</b>
              </p>
              <p>{document.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Listing_details;

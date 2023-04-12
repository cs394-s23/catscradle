import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useReducer } from 'react';
import db from '../../../firebase.js';
import { storage } from '../../../firebase.js';
import "./Upload.css";
import { collection, addDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = () => {

    async function submitListing() {

        // create new images url array
        var img_urls = []

        event.preventDefault(); // prevent refresh page

        // Get value of each of form's input
        var itemTitle = document.getElementById("itemTitle").value;
        var itemType = document.getElementById("itemType").value;
        var description = document.getElementById("description").value;
        var price = document.getElementById("price").value;
        var address = document.getElementById("address").value;
        var ammenities = document.getElementById("ammenities").value.split(", ");
        var images = document.getElementById("images").files;
        var availableFromDate = document.getElementById("availableFromDate").value; // may need to turn into datetime
        var availableToDate = document.getElementById("availableToDate").value; // may need to turn into datetime
        var condition = document.getElementById("condition").value;
        var propertyClass = document.getElementById("propertyClass").value;
        var sellerName = document.getElementById("sellerName").value;
        var sellerEmail = document.getElementById("sellerEmail").value;
        var sellerPhone = document.getElementById("sellerPhone").value;

        // console.log(itemTitle);
        // console.log(itemType);
        // console.log(description);
        // console.log(price);
        // console.log(address);
        // console.log(ammenities);
        // console.log(images);
        // console.log(availableFromDate);
        // console.log(availableToDate);

        // Upload images first to Firebase Storage
        for (let i = 0; i < images.length; i++) {
            const imageRef = ref(storage, "images/" + images[i].name);
            await uploadBytes(imageRef, images[i]).then(async() => {
                await getDownloadURL(imageRef)
                    .then((url) => {
                        img_urls.push(url);
                    })
                    .catch((error) => {
                        console.log(error.message, "error getting the image url");
                    });
            })
            .catch((error) => {
                console.log(error.message, "error uploading the image");
            });
        };

        // Create custom data type
        var dataPush = {
            itemTitle : itemTitle,
            itemType: itemType,
            description: description,
            price: price,
            address: address,
            ammenities: ammenities,
            availableFrom: availableFromDate,
            availableTo: availableToDate,
            images: img_urls,
            condition: condition,
            propertyClass: propertyClass,
            seller: {
                name: sellerName,
                email: sellerEmail,
                phone: sellerPhone
            }
        }

        // Insert data into Firebase Real Time Database
        const docRef = await addDoc(collection(db, "Properties"), dataPush);
        console.log("Document written with ID: ", docRef.id);
          
    }

    return (
        <div className="Upload">
            <div className="up_header">
                <h1> Upload a new listing </h1>
                <a href="/" className="Return_home_button">
                    <h4> 🏠 Return to Home </h4>
                </a>
            </div>
            <form className="up_form">
                <div>
                    <label htmlFor="itemTitle">Title</label>
                    <input type="text" id="itemTitle" name="itemTitle" placeholder="Title of your listing" />
                </div> 
                <div>
                    <label htmlFor="itemType">Item Type</label>
                    <select id="itemType" name="items" required defaultValue={'Property'}>
                        <option value="property">Property</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" placeholder="Description of your listing" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" placeholder="Price of your listing" />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Address of your listing" />
                </div>
                <div>
                    <label htmlFor="ammenities">Ammenities</label>
                    <input type="text" id="ammenities" name="ammenities" placeholder="e.g. gym, pool, (seperate using commas)" />
                </div>
                <div>
                    <label htmlFor="images">Images</label>
                    <input type="file" id="images" name="images" multiple="multiple"/>
                </div>
                <div>
                    <label htmlFor="availableFromDate">Available From</label>
                    <input type="date" id="availableFromDate" name="availableFromDate" />
                </div>
                <div>
                    <label htmlFor="availableToDate">Available To</label>
                    <input type="date" id="availableToDate" name="availableToDate" />
                </div>
                <div>
                    <label htmlFor="condition">Condition</label>
                    <select id="condition" name="condition" required defaultValue={'New'}>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="propertyClass">Property Type</label>
                    <select id="propertyClass" name="propertyClass" required defaultValue={'Apartment'}>
                        <option value="Apartment">Apartment</option>
                        <option value="Studio">Studio</option>
                        <option value="Room">Room</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sellerName">Seller Name</label>
                    <input type="text" id="sellerName" name="sellerName" placeholder="Johnny Appleseed" />
                </div>
                <div>
                    <label htmlFor="sellerEmail">Seller Email</label>
                    <input type="text" id="sellerEmail" name="sellerEmail" placeholder="j.a@gmail.com" />
                </div>
                <div>
                    <label htmlFor="sellerPhone">Seller Phone</label>
                    <input type="text" id="sellerPhone" name="sellerPhone" placeholder="1112223333" />
                </div>

                <input id="submit_button" type="submit" value="Submit" onClick={submitListing}></input>
            </form>
        </div>
    )

}

export default Upload;
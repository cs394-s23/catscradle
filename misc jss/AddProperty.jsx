import React, { useState } from "react";
import { db } from '../firebase-setup.jsx';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function AddProperty() {
  const [itemType, setItemType] = useState("Property");
  const [itemTitle, setItemTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [numBedrooms, setNumBedrooms] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const propertyData = {
        itemType,
        itemTitle,
        description,
        rentPrice: parseFloat(rentPrice),
        condition,
        category,
        type,
        numBedrooms: numBedrooms ? parseInt(numBedrooms) : null,
        numBathrooms: numBathrooms ? parseInt(numBathrooms) : null,
        propertySize: propertySize ? parseInt(propertySize) : null,
        availableFrom: availableFrom ? new Date(availableFrom) : null,
        availableTo: availableTo ? new Date(availableTo) : null,
        seller: {
          // Replace this with the actual user data when you have authentication set up
          uid: "unique_user_id",
          name: sellerName,
          email: sellerEmail,
          phone: sellerPhone,
        },
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "properties"), propertyData);
      // Show success message or clear input fields
    } catch (error) {
      console.error("Error adding property: ", error);
    }
  };

  return (
    <div>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
          <option value="Property">Property</option>
          <option value="Furniture">Furniture</option>
        </select>
        <input
          type="text"
          placeholder="Item Title"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          step="0.01"
          placeholder="Rent Price"
          value={rentPrice}
          onChange={(e) => setRentPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Bedrooms"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Bathrooms"
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
          />
          <input
            type="number"
            placeholder="Property Size"
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
          />
          <input
            type="date"
            placeholder="Available From"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
          <input
            type="date"
            placeholder="Available To"
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Seller Name"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Seller Email"
            value={sellerEmail}
            onChange={(e) => setSellerEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Seller Phone"
            value={sellerPhone}
            onChange={(e) => setSellerPhone(e.target.value)}
          />
          <input
            type="number"
            step="0.000001"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="number"
            step="0.000001"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button type="submit">Add Property</button>
        </form>
      </div>
    );
  }
  
  export default AddProperty;
  

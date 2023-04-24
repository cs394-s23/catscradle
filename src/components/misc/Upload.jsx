import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useReducer, useRef } from "react";
import db from "../../../firebase.js";
import { storage } from "../../../firebase.js";
import { Link } from "react-router-dom";
import "./Upload.css";
import logo from "./paw.jpeg";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = () => {
  // using states now instead of vanilla JS
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [numBedrooms, setNumBedrooms] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [submitButton, setSubmitButton] = useState("Submit");

  const [avilableFrom, setavilableFrom] = useState("");
  const [availableTo, setavailableTo] = useState("");
  const dateInputRef = useRef(null);

  var img_urls = [];

  // input handlers
  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNumBedroomsChange = (e) => {
    setNumBedrooms(e.target.value);
  };

  const handleNumBathroomsChange = (e) => {
    setNumBathrooms(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhone(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setavilableFrom(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setavailableTo(e.target.value);
  };

  // form validation:
  // 1. Check photo is PNG or JPEG
  // 2. Apporpriate units per different input type
  //
  // form validation
  const validateForm = () => {
    let isValid = true;
    let tempErrorMessages = [];

    // Validate images
    images.forEach((image, index) => {
      if (!image.type.match(/^image\/(png|jpe?g)$/)) {
        isValid = false;
        tempErrorMessages.push(
          `Invalid file format for ${images[index].name}. Only PNG and JPEG files are allowed.`
        );
      }
    });

    // Validate other fields based on property type
    if (propertyType === "property") {
      if (!Number.isInteger(Number(numBedrooms)) || Number(numBedrooms) < 0) {
        isValid = false;
        tempErrorMessages.push(
          "Number of bedrooms must be a non-negative integer."
        );
      }
      if (!Number.isInteger(Number(numBathrooms)) || Number(numBathrooms) < 0) {
        isValid = false;
        tempErrorMessages.push(
          "Number of bathrooms must be a non-negative integer."
        );
      }
    }

    // Validate price for both property types
    if (Number(price) <= 0) {
      isValid = false;
      tempErrorMessages.push("Price must be a positive number.");
    }

    // Validate phone number for both property types
    const phoneNumberPattern = /^\d{10}$/;
    if (!phone.match(phoneNumberPattern)) {
      isValid = false;
      tempErrorMessages.push("Phone number must be a valid 10-digit number.");
    }

    setErrorMessages(tempErrorMessages);
    setError(isValid);
    return isValid;
  };

  // Handle Form Submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      setError(true);
      return;
    }

    setError(false);

    var dataPush = {};

    var sellerEmail = localStorage.getItem("email");
    var sellerName = localStorage.getItem("name");

    // Upload images first to Firebase Storage
    const uploadPromises = images.map(async (image) => {
      const imageRef = ref(storage, "images/" + image.name);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      img_urls.push(url);
    });

    await Promise.all(uploadPromises);

    if (images.length > 0) {
      console.log("Images Successfully Uploaded to Firebase Storage");
    } else {
      console.log("No images submitted by user...");
    }

    // Create custom data type
    if ((await propertyType) == "furniture") {
      dataPush = {
        title: title,
        cardType: propertyType,
        monthlyPrice: price,
        images: img_urls,
        seller: {
          name: sellerName,
          email: sellerEmail,
          phone: phone,
        },
        description: description,
        address: address,
        availableFrom: avilableFrom,
        availableTo: availableTo,
      };
    } else {
      dataPush = {
        title: title,
        cardType: propertyType,
        numBathrooms: numBathrooms,
        numBedrooms: numBedrooms,
        description: description,
        monthlyPrice: price,
        address: address,
        availableFrom: avilableFrom,
        availableTo: availableTo,
        images: img_urls,
        seller: {
          name: sellerName,
          email: sellerEmail,
          phone: phone,
        },
      };
    }

    await console.log("Pushing data to firebase...");
    await console.log(dataPush);

    // Insert data into Firebase Firestore Document Stage
    await setSubmitButton("Uploading...");

    const docRef = await addDoc(collection(db, "Properties"), dataPush);
    await console.log(docRef);
    await console.log("Document written with ID: ", docRef.id);

    await setSubmitButton("Done!");

    // wait 1 second
    await setTimeout(() => {
      console.log("Delayed for 1 seconds");
      window.location.href = "/";
    }, "1000");
  }

  return (
    <div className="root">
      {/* logo and app name */}
      <div className="logo">
        <p>
          <span style={{ fontSize: "40px" }}>CatsCradle</span>
          <span style={{ marginLeft: "5px" }}>
            <img src={logo} />
          </span>
        </p>
      </div>

      <Link className="return-home-btn" to="/">
        Home
      </Link>

      <form onSubmit={handleSubmit} id="uploadForm">
        {error
          ? errorMessages.map((x, idx) => (
              <p key={idx} style={{ color: "red" }}>
                {x}
              </p>
            ))
          : ""}

        <div className="upload-form-control">
          <label> Property Type:</label>
          <select value={propertyType} onChange={handlePropertyTypeChange}>
            <option value=""> Please choose an option </option>
            <option value="property">Property</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        {propertyType === "property" ? (
          <>
            <div className="upload-form-control">
              <label>Title: </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="upload-form-control">
              <label>Address: </label>
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                required
              />
            </div>

            <div className="upload-form-control">
              <label>Number of Bedrooms: </label>
              <input
                type="number"
                value={numBedrooms}
                onChange={handleNumBedroomsChange}
                required
              />
            </div>
            <div className="upload-form-control">
              <label>Number of Bathrooms: </label>
              <input
                type="number"
                value={numBathrooms}
                onChange={handleNumBathroomsChange}
                required
              />
            </div>
            <div className="upload-form-control">
              <label>Images of the Apartment: </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="upload-form-control">
              <label>Price:</label>
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                required
              />
            </div>

            <div className="upload-form-control">
              <label>Phone Number:</label>
              <input
                type="number"
                value={phone}
                onChange={handlePhoneNumber}
                required
              />
            </div>

            <div className="upload-form-control">
              <label> Available From: </label>
              <input
                value={avilableFrom}
                type="date"
                onChange={handleStartDateChange}
                ref={dateInputRef}
              />
            </div>

            <div className="upload-form-control">
              <label> Available to: </label>
              <input
                value={availableTo}
                type="date"
                onChange={handleEndDateChange}
                ref={dateInputRef}
              />
            </div>

            <div className="upload-form-control">
              <label>Description: </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>
          </>
        ) : propertyType === "furniture" ? (
          <>
            <div className="upload-form-control">
              <label>Title: </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <div className="upload-form-control">
                <label>Images of the Furniture Piece: </label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>
            <div className="upload-form-control">
              <label> Price: </label>
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                required
              />
            </div>
            <div className="upload-form-control">
              <label>Phone Number:</label>
              <input
                type="number"
                value={phone}
                onChange={handlePhoneNumber}
                required
              />
            </div>
            <div className="upload-form-control">
              <label> Available From: </label>
              <input
                value={avilableFrom}
                type="date"
                onChange={handleStartDateChange}
                ref={dateInputRef}
              />
            </div>

            <div className="upload-form-control">
              <label> Available to: </label>
              <input
                value={availableTo}
                type="date"
                onChange={handleEndDateChange}
                ref={dateInputRef}
              />
            </div>
            <div className="upload-form-control">
              <label> Description: </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>
          </>
        ) : null}
        <button id="uploadFormSubmitBtn" type="submit">
          {submitButton}
        </button>
      </form>
    </div>
  );
};

export default Upload;

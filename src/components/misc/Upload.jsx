import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useReducer } from "react";
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

  // form validation;


  // Handle Form Submission
  async function handleSubmit(e) {
    e.preventDefault();

    var dataPush = {}

    var sellerEmail = localStorage.getItem("email");
    var sellerName = localStorage.getItem("name");

    // Upload images first to Firebase Storage
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, "images/" + images[i].name);
      uploadBytes(imageRef, images[i])
        .then(async () => {
          getDownloadURL(imageRef)
            .then((url) => {
              img_urls.push(url);
            })
            .catch((error) => {
              console.log(error.message, ", error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message, "error uploading the image");
        });
    }

    if (images.length > 0) {
      console.log("Images Successfully Uploaded to Firebase Storage")
    } else {
      console.log("No images submitted by user...")
    }

    // Create custom data type
    if (await propertyType == "furniture") {
      dataPush = {
        itemTitle: title,
        itemType: propertyType,
        price: price,
        images: img_urls,
        seller: {
          name: sellerName,
          email: sellerEmail,
          phone: phone,
        },
      };
    } else {
      dataPush = {
        itemTitle: title,
        itemType: propertyType,
        numBathrooms: numBathrooms,
        numBedrooms: numBedrooms,
        description: description,
        price: price,
        address: address,
        images: img_urls,
        seller: {
          name: sellerName,
          email: sellerEmail,
          phone: phone,
        },
      };
    };

    await console.log("Pushing data to firebase...")
    await console.log(dataPush)

    // Insert data into Firebase Firestore Document Stage
    await setSubmitButton("Uploading...");

    const docRef = await addDoc(collection(db, "Properties"), dataPush);
    await console.log(docRef);
    await console.log("Document written with ID: ", docRef.id);

    await setSubmitButton("Done!");

    // wait 1 second
    await setTimeout(() => {
      console.log("Delayed for 1 seconds");
      window.location.href = "/"
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
          ? message.map((x, idx) => (
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
              <label> Description: </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
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

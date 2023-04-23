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

  //   function submitProgressBar() {
  //     // var submitButton = document.getElementById("submitSection1");
  //     // console.log(submitButton)
  //     // console.log(submitButton.innerHtml)
  //     // submitButton.innerHtml = `<div class="submitButtonProgress">`
  //     // console.log(submitButton.innerHtml)
  //     // console.log(submitButton)
  //     // console.log("Changed")

  //     var i = 0;
  //     if (i == 0) {
  //       i = 1;
  //       var elem = document.getElementById("submit_button");
  //       var elem_max_width = elem.clientWidth;
  //       elem.setAttribute("value", ""); // clear the button value

  //       var currentWidth = 0;
  //       var incrementSpeed = 0.3;
  //       elem.style.width = 1 + "px";
  //       var id = setInterval(frame, 1);

  //       function frame() {
  //         if (currentWidth > elem_max_width) {
  //           clearInterval(id);
  //           i = 0;
  //         } else {
  //           currentWidth += incrementSpeed;
  //           incrementSpeed += 0.01;
  //           elem.style.width = currentWidth + "px"; //changed from % to px due to clientWidth changing
  //         }
  //         return true;
  //       }
  //     }
  //   }

  //
  async function handleSubmit(e) {
    e.preventDefault();

    var sellerEmail = localStorage.getItem("email");
    var sellerName = localStorage.getItem("name");

    // Upload images first to Firebase Storage
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, "images/" + images[i].name);
      await uploadBytes(imageRef, images[i])
        .then(async () => {
          await getDownloadURL(imageRef)
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

    console.log("Images Successfully Uploaded to Firebase Storage")

    var dataPush = {}

    // Create custom data type
    if (propertyType == "furniture") {
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
    }

    console.log("Pushing data to firebase...")
    console.log(dataPush)

    // // Insert data into Firebase Real Time Database
    const docRef = await addDoc(collection(db, "Properties"), dataPush);
    console.log(docRef);
    console.log("Document written with ID: ", docRef.id);

    if (submitProgressBar()) {
      window.location.href = await  "/";
    }
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;

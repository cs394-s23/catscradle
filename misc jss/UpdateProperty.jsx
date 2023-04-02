import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from '../firebase-setup.jsx';
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

function UpdateProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  // Add other input fields state as needed

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyRef = doc(db, "properties", id);
      const propertyData = await getDoc(propertyRef);

      if (propertyData.exists()) {
        setProperty(propertyData.data());
        setItemTitle(propertyData.data().itemTitle);
        // Set other input fields state with the fetched data
      } else {
        console.error("Property not found");
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const propertyRef = doc(db, "properties", id);
      await updateDoc(propertyRef, {
        itemTitle,
        // Update other fields as needed
        updatedAt: serverTimestamp(),
      });
      // Show success message or navigate back to the list
    } catch (error) {
      console.error("Error updating property: ", error);
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Title"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />
        {/* Add other input fields as needed */}
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
}

export default UpdateProperty;


import React, { useState, useEffect } from "react";
import { db } from '../firebase-setup.jsx';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import PropertyItem from "./PropertyItem"; // Create this component in the next step

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "properties"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setProperties(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Property List</h1>
      {properties.map((property) => (
        <PropertyItem key={property.id} property={property} />
      ))}
    </div>
  );
}

export default PropertyList;

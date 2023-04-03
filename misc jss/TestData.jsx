import React, { useState, useEffect } from 'react';
import { db } from '../firebase-setup.jsx';

const TestData = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesRef = db.collection('properties');
      const snapshot = await propertiesRef.get();

      const propertiesData = [];
      snapshot.forEach((doc) => {
        propertiesData.push({ id: doc.id, ...doc.data() });
      });

      setProperties(propertiesData);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Properties:</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.itemTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestData;

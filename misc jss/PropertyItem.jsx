import React from "react";
import { useHistory } from "react-router-dom";

function PropertyItem({ property }) {
  const history = useHistory();

  const handleUpdate = () => {
    history.push(`/update/${property.id}`);
  };

  return (
    <div>
      <h2>{property.itemTitle}</h2>
      <p>{property.description}</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default PropertyItem;

import React, { useState } from "react";
import "./Listing_images.css";
import Listing_single_image from "./Listing_single_image";

function Listing_images(props) {
  const images = props.document.images;
  // const images = ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&w=1000&q=80", "https://www.goodwinlaw.com/-/media/images/services/industries/real-estate-industry.jpg?h=1160&iar=0&w=1700&rev=835dc3198891482aba232634aa86344c&hash=DDA9897551AA084476CD2FF46C565696", "https://imageio.forbes.com/specials-images/imageserve/620b955fe91fd28db343f3c8/Modern-office-building-close-up-in-sunlight/960x0.jpg?format=jpg&width=960", "https://www.barings.com/contentassets/76eb812a36ba4bd0ad0630fe190ce252/real-estate-debt.jpg?t=20220310024830"];

  return (
    <div>
      <div className="Listing_images_scroll_panel">
        {images.length > 0 ? (
          images.map((image, index) => {
            return <Listing_single_image key={index} image_link={image} />;
          })
        ) : (
          <p> No images </p>
        )}
      </div>
    </div>
  );
}

export default Listing_images;

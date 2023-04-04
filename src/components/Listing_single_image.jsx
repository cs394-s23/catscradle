import { useState } from 'react';
import './Listing_single_image.css';

function Listing_single_image(props) {

    return (
        <div className="misc">
            <img className="Listing_single_image" src={props.image_link} alt="listing_image"/>
        </div>
    );
};

export default Listing_single_image;
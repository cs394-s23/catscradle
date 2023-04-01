import { useState } from 'react';
import './Listing.css';
import Listing_images from './Listing_images';
// import Listing_details from './Listing_Details';

const Listing = (props) => {    

    return (
        <div className="Listing">
            <header className="Listing_header">
                <h1> {props.document.name} </h1>
            </header>
            <Listing_images document={props.document}/>
            {/* <Listing_details/> */}
        </div>
    );
};

export default Listing;

import { useState } from 'react';
import './Listing.css';
import Listing_images from './Listing_images';
import Listing_details from './Listing_Details';

const Listing = (props) => {    

    return (
        <div className="Listing">
            <div className="Listing_top">
                <header className="Listing_header">
                    <div className="Listing_header_content">
                        <h1> {props.document.name} </h1>
                        <h4> Return to Home </h4>
                    </div>
                </header>
                <Listing_images document={props.document}/>
            </div>
            <div className="Listing_details_in_general">
                <Listing_details document={props.document}/>
            </div>
        </div>
    );
};

export default Listing;

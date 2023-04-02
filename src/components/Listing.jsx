import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';
import Listing_images from './Listing_images';
import Listing_details from './Listing_Details';

const Listing = (props) => {    

    return (
        <div className="Listing">
            <div className="Listing_top">
                <header className="Listing_header">
                    <div className="Listing_header_content">
                        <h1> {props.document.itemTitle} </h1>
                        <a href="/" className="Return_home_button"> <h4> Return to Home </h4> </a>
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

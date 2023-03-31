import { useState } from 'react';
import './Listing.css';
import Listing_images from './Listing_images';
// import Listing_details from './Listing_Details';

const Listing = () => {
    const [count, setCount] = useState(0);
    
    return (
        <div className="Listing">
            <header className="Listing-header">
                <h1> Listing Details </h1>
            </header>
            <Listing_images/>
            {/* <Listing_details/> */}
        </div>
    );
};

export default Listing;

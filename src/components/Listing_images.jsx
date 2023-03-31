import { useState } from 'react';
import './Listing_details.css';

const Listing_details = () => {
    const [count, setCount] = useState(0);
    
    return (
        <div className="Listing_details">
            <header className="Listing_details-header">
                <h1> Listing Details </h1>
            </header>
        </div>
    );
}

export default Listing_details;
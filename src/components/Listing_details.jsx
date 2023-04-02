import React, { useState } from "react";
import "./Listing_details.css";

const Listing_details = (props) => {
  // getting the various properties
  // document.id
  return (
    // if else that checks props document type
    <div className="Listing_details">
      <div className="Message_box">
        <p>Message Person: (XXX) XXX-XXXX</p>
      </div>
      <div className="Details_box">
        <div className="Main_details">
          <div className="Basic_info">
            <div>
              <ul>
                <b>Category:</b> Chair
              </ul>
              <ul>
                <b>Condition:</b> New
              </ul>
            </div>
            <div>
              <ul>
                <b>Price:</b> $10
              </ul>
              <ul>
                <b>Pickup Location:</b> Location
              </ul>
            </div>
          </div>
          {/* replace with {document.description} */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            mattis leo ipsum. Donec pellentesque nibh in nisl scelerisque, in
            aliquam sapien gravida. Mauris eu risus a risus commodo mattis at
            eget neque. Nullam ac faucibus leo, ac cursus eros. Nulla viverra
            justo nec finibus posuere. Cras vitae nibh mi. Aliquam erat
            volutpat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Listing_details;

// const Listing_details = (props) => {
//     // getting the various properties
//     // document.id
//     return (
//       // if else that checks props document type
//       <div className="Listing_details">
//         <div className="Message_box">
//           <p>Message Person: (XXX) XXX-XXXX</p>
//         </div>
//         <div className="Details_box">
//           <div className="Main_details">
//             <div className="Basic_info">
//               <div>
//                 <ul>
//                   <b>Bedrooms:</b> 1
//                 </ul>
//                 <ul>
//                   <b>Baths:</b> 1
//                 </ul>
//               </div>
//               <div>
//                 <ul>
//                   <b>Rent:</b> $1500/month
//                 </ul>
//                 <ul>
//                   <b>Rental Period:</b> June - August
//                 </ul>
//               </div>
//             </div>
//             {/* replace with {document.description} */}
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//               mattis leo ipsum. Donec pellentesque nibh in nisl scelerisque, in
//               aliquam sapien gravida. Mauris eu risus a risus commodo mattis at
//               eget neque. Nullam ac faucibus leo, ac cursus eros. Nulla viverra
//               justo nec finibus posuere. Cras vitae nibh mi. Aliquam erat
//               volutpat.
//             </p>
//           </div>
//           <div className="Amenities">
//             <p>Amenities</p>
//             {/* iterate through everything in amenities and initialize a ul item */}
//             <li>Item</li>
//             <li>Item</li>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default Listing_details;

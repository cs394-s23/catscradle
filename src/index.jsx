import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const test_document1 = {
  itemTitle: "Skyline Apartment",
  itemType: "property",
  images: [
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    "https://www.goodwinlaw.com/-/media/images/services/industries/real-estate-industry.jpg?h=1160&iar=0&w=1700&rev=835dc3198891482aba232634aa86344c&hash=DDA9897551AA084476CD2FF46C565696",
    "https://imageio.forbes.com/specials-images/imageserve/620b955fe91fd28db343f3c8/Modern-office-building-close-up-in-sunlight/960x0.jpg?format=jpg&width=960",
    "https://www.barings.com/contentassets/76eb812a36ba4bd0ad0630fe190ce252/real-estate-debt.jpg?t=20220310024830",
  ],
  address: "1811 Sherman Ave 60201",
  numBedrooms: 1,
  numBathrooms: 1,
  price: 1000,
  description: "This is a great apartment in a great location",
  availableFrom: "July",
  availableTo: "September",
  seller: {
    name: "Alice Smith",
    phone: "626-000-0000",
  },
  amenities: ["gym", "central heating"],
};

const test_document2 = {
  itemTitle: "Spacious Condo",
  itemType: "property",
  images: [
    "https://thumbs.cityrealty.com/assets/smart/0x0/webp/b/b5/b57ad835236f5b5bf22e8d096dd14325a56d2d01/432-park-avenue-00.jpg",
    "https://static01.nyt.com/images/2019/06/23/realestate/21highend-rockefeller1/91f23d827b064902bafb1dbbd58a961f-superJumbo.jpg",
  ],
  address: "123 Main Street, Anytown USA",
  numBedrooms: 2,
  numBathrooms: 2,
  price: 1500,
  description: "This is a great apartment in a New york lmao",
  availableFrom: "May",
  availableTo: "August",
  seller: {
    name: "Alice Smith",
    phone: "626-000-0000",
  },
  amenities: ["gym", "pool"],
};

const test_document3 = {
  itemTitle: "Luxury Penthouse",
  itemType: "property",
  images: [
    "https://circala.com/wp-content/uploads/2020/05/Circa-Penthouse-01_web.jpg",
    "https://ca-times.brightspotcdn.com/dims4/default/ac27cb6/2147483647/strip/true/crop/4953x3297+0+0/resize/1200x799!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F48%2Ffa%2F5a98669e438d9b4f47135b5afb04%2F8899-beverly-v3-fullres-34.jpg",
  ],
  address: "456 Park Ave, New York, NY",
  numBedrooms: 3,
  numBathrooms: 3,
  price: 5000,
  description: "This is a great apartment in a Los Angeles lmao",
  availableFrom: "May",
  availableTo: "August",
  seller: {
    name: "Alice Smith",
    phone: "626-000-0000",
  },
  amenities: [],
};

const test_document4 = {
  itemTitle: "IKEA Shoe Rack",
  itemType: "furniture",
  images: [
    "https://circala.com/wp-content/uploads/2020/05/Circa-Penthouse-01_web.jpg",
    "https://ca-times.brightspotcdn.com/dims4/default/ac27cb6/2147483647/strip/true/crop/4953x3297+0+0/resize/1200x799!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F48%2Ffa%2F5a98669e438d9b4f47135b5afb04%2F8899-beverly-v3-fullres-34.jpg",
  ],
  category: "Other",
  condition: "Used",
  price: 20,
  description: "This is a shoe rack from IKEA",
  seller: {
    name: "Alice Smith",
    phone: "626-000-0000",
  },
  address: "1811 Sherman Ave 60201",
};

const test_documents = [
  test_document1,
  test_document2,
  test_document3,
  test_document4,
];

root.render(
  <React.StrictMode>
    <App documents={test_documents} />
  </React.StrictMode>
);

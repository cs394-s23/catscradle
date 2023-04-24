import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import random
import time

# Replace 'path/to/your-service-account-key.json' with the path to the JSON file you downloaded
cred = credentials.Certificate('catscradle-firebasetry5-firebase-adminsdk-heax2-c180b86046.json')

# Initialize the Firebase app
app = firebase_admin.initialize_app(cred)

# Create a Firestore client
db = firestore.client()

# Initialize Objects here

obj1 = {
  "cardType": "property",
  "cardCategory": "apartment",
  "title": "Domus on the Boulevard",
  "monthlyPrice": 3500,
  "images": [
    "https://res.cloudinary.com/g5-assets-cld/image/upload/x_5,y_0,h_1498,w_2995,c_crop/q_auto,f_auto,fl_lossy,g_center,h_1000,w_2000/g5/g5-c-idgh48mn-pacific-urban-residential/g5-cl-56m2hmea6-domus-on-the-boulevard/uploads/DomusWeb2163_u0w6dq.jpg",
    "https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,c_fill,g_center,h_1000,w_2000/v1577403491/g5/g5-c-idgh48mn-pacific-urban-residential/g5-cl-56m2hmea6-domus-on-the-boulevard/uploads/DomusWeb2142_rzr0b6.jpg"
  ],
  "seller": {
    "sellerName": "John Doe",
    "sellerEmail": "johndoe@example.com",
    "sellerPhone": "+1 (123) 456-7890"
  },
  "description": "Luxury apartment in the heart of Mountain View",
  "address": "123 Main St",
  "numBathrooms": 2,
  "numBedrooms": 3,
  "amenities": [
    "Swimming pool",
    "Fitness center",
    "Tennis court"
  ],
  "availableFrom": "2023-05-01T00:00:00Z",
  "availableTo": "2023-05-31T00:00:00Z",
  "propertySize": 2000
}

obj2 = {
  "cardType": "property",
  "cardCategory": "apartment",
  "title": "Evanston Place",
  "monthlyPrice": 1200,
  "images": [
    "https://s7d9.scene7.com/is/image/aimcoprod/Evanston_Place_Apt907N_Balcony_view_zoom?qlt=85&fmt=jpg",
    "https://s7d9.scene7.com/is/image/aimcoprod/1_1715ChicagoAve_1_LivingRoom_HiRes_CMYK_2?qlt=85&fmt=jpg"
  ],
  "seller": {
    "sellerName": "Jane Smith",
    "sellerEmail": "janesmith@example.com",
    "sellerPhone": "+1 (234) 567-8901"
  },
  "description": "Luxury apartment near Northwestern University",
  "address": "456 Elm St",
  "numBathrooms": 1,
  "numBedrooms": 2,
  "amenities": [
    "Gym",
    "Game room",
    "Pet-friendly"
  ],
  "availableFrom": "2023-06-01T00:00:00Z",
  "availableTo": "2023-06-30T00:00:00Z",
  "propertySize": 1500
}

obj3 = {
  "cardType": "furniture",
  "cardCategory": "dining",
  "title": "Office Chair",
  "monthlyPrice": 50,
  "images": [
    "https://media.wired.com/photos/61895f18da25312569a5af19/master/w_2580,c_limit/Gear-Staples-Hyken-SOURCE-Staples.jpg",
    "https://pyxis.nymag.com/v1/imgs/6a2/ef6/694d3b575d3893b980a854aaa5cbc6de9c-bic-office-chairs.2x.rsocial.w600.jpg"
  ],
  "seller": {
    "sellerName": "Mark Johnson",
    "sellerEmail": "markjohnson@example.com",
    "sellerPhone": "+1 (345) 678-9012"
  },
  "description": "A great office chair to allow you to work in comfort...",
  "address": "789 Oak St",
  "availableFrom": "2023-07-01T00:00:00Z",
  "availableTo": "2023-07-31T00:00:00Z",
  "propertySize": 2500
}

data = [obj1, obj2, obj3]

for record in data:
    db.collection(u'ccTesting').add(record)

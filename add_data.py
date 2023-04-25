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
  "cardCategory": "living",
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
  "description": "A great office chair to allow you to work in comfort.",
  "address": "789 Oak St",
  "availableFrom": "2023-07-01T00:00:00Z",
  "availableTo": "2023-07-31T00:00:00Z",
  "propertySize": 2500
}

obj4 = {
  "cardType": "apartment",
  "cardCategory": "rent",
  "title": "The Uptown Residences",
  "monthlyPrice": 2200,
  "images": [
    "https://unsplash.com/photos/yFV39g6AZ5o",
    "https://unsplash.com/photos/jWU9FpLW7fI"
  ],
  "seller": {
    "sellerName": "Samantha Brown",
    "sellerEmail": "samanthabrown@example.com",
    "sellerPhone": "+1 (555) 123-4567"
  },
  "description": "This spacious and stylish 2-bedroom, 2-bathroom apartment boasts an open-concept layout with modern finishes, large windows, and a private balcony...",
  "address": "123 Elm St",
  "availableFrom": "2023-06-01T00:00:00Z",
  "availableTo": "2024-05-31T00:00:00Z",
  "propertySize": 1200
}

obj5 = {
  "cardType": "apartment",
  "cardCategory": "rent",
  "title": "Elmwood Terrace Apartments",
  "monthlyPrice": 1400,
  "images": [
    "https://unsplash.com/photos/M0k4llbRpHU",
    "https://unsplash.com/photos/mCvYFXGA0Hk"
  ],
  "seller": {
    "sellerName": "John Smith",
    "sellerEmail": "johnsmith@example.com",
    "sellerPhone": "+1 (555) 234-5678"
  },
  "description": "This inviting 1-bedroom, 1-bathroom apartment is nestled in a quiet residential neighborhood and features a working fireplace, hardwood floors, and ample natural light...",
  "address": "456 Maple Ave",
  "availableFrom": "2023-07-01T00:00:00Z",
  "availableTo": "2023-12-31T00:00:00Z",
  "propertySize": 800
}

obj6 = {
  "cardType": "apartment",
  "cardCategory": "rent",
  "title": "Skyline Tower Apartments",
  "monthlyPrice": 1800,
  "images": [
    "https://unsplash.com/photos/9pw5-wpoNwo",
    "https://unsplash.com/photos/Mm6CxMm-MNQ"
  ],
  "seller": {
    "sellerName": "Lucy Davis",
    "sellerEmail": "lucydavis@example.com",
    "sellerPhone": "+1 (555) 345-6789"
  },
  "description": "This luxurious studio apartment offers floor-to-ceiling windows, a gourmet kitchen with stainless steel appliances, and stunning city views...",
  "address": "789 Pine St",
  "availableFrom": "2023-08-01T00:00:00Z",
  "availableTo": "2024-07-31T00:00:00Z",
  "propertySize": 600
}

obj7 = {
  "cardType": "apartment",
  "cardCategory": "rent",
  "title": "Oak Grove Manor",
  "monthlyPrice": 2500,
  "images": [
    "https://unsplash.com/photos/J7clI8qJ0xA",
    "https://unsplash.com/photos/GqbU78bdJFM"
  ],
  "seller": {
    "sellerName": "Olivia Wilson",
    "sellerEmail": "oliviawilson@example.com",
    "sellerPhone": "+1 (555) 456-7890"
  },
  "description": "This charming and spacious 3-bedroom, 2-bathroom apartment is located in a family-friendly neighborhood and features original hardwood floors, built-in bookshelves, and a sunroom...",
  "address": "321 Birch Ln",
  "availableFrom": "2023-09-01T00:00:00Z",
  "availableTo": "2024-08-31T00:00:00Z",
  "propertySize": 1500
}

obj8 = {
  "cardType": "apartment",
  "cardCategory": "rent",
  "title": "Willow Park Townhomes",
  "monthlyPrice": 2300,
  "images": [
    "https://unsplash.com/photos/QL7KdXdcfWA",
    "https://unsplash.com/photos/LYO6Aznnp7c"
  ],
  "seller": {
    "sellerName": "Michael Thompson",
    "sellerEmail": "michaelthompson@example.com",
    "sellerPhone": "+1 (555) 567-8901"
  },
  "description": "This updated 2-story townhouse offers 3 bedrooms and 2.5 bathrooms, a private backyard, and an attached garage...",
  "address": "987 Cedar Dr",
  "availableFrom": "2023-10-01T00:00:00Z",
  "availableTo": "2024-09-30T00:00:00Z",
  "propertySize": 1800
}

obj9 = {
  "cardType": "furniture",
  "cardCategory": "living",
  "title": "Velvet Sofa",
  "monthlyPrice": 125.50,
  "images": [
    "https://cdn.shopify.com/s/files/1/1741/7529/products/2.jpg?v=1632835359"
  ],
  "seller": {
    "sellerName": "John Smith",
    "sellerEmail": "john.smith@example.com",
    "sellerPhone": "+1 (555) 123-4567"
  },
  "description": "A brand new velvet sofa with gold legs.",
  "address": "312 Church St",
  "availableFrom": "2022-07-01T00:00:00Z",
  "availableTo": "2023-08-31T00:00:00Z",
  "propertySize": 2500
}

obj10 = {
  "cardType": "furniture",
  "cardCategory": "living",
  "title": "Modern Sofa",
  "monthlyPrice": 80,
  "images": [
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81QK5J2i6tL.jpg",
    "https://media1.popsugar-assets.com/files/thumbor/0O08jYEURCBhs-vfkGW1UxUqOF4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/09/24/656/n/1922794/4ed892fe8f27dd6e_netimgZJ8AW4/i/Best-Sectional-Sofa-Albany-Park-Park-Sectional-Sofa.jpg"

  ],
  "seller": {
    "sellerName": "John Doe",
    "sellerEmail": "john.doe@example.com",
    "sellerPhone": "+1 (555) 123-4567"
  },
  "description": "A comfortable and stylish modern sofa in excellent condition.",
  "address": "1213 Sheridan Road",
  "availableFrom": "2023-07-01T00:00:00Z",
  "availableTo": "2023-07-31T00:00:00Z",
  "propertySize": 2500
}

obj11 = {
  "cardType": "furniture",
  "cardCategory": "dining",
  "title": "Elegant Dining Table",
  "monthlyPrice": 850,
  "images": [
    "https://casapitti.com/wp-content/uploads/2021/06/7713_ambient.jpg",
    "https://cdn.shopify.com/s/files/1/1370/6459/products/GFXS0061-Edit-WEB.jpg?v=1615444415"
  ],
  "seller": {
    "sellerName": "Emily White",
    "sellerEmail": "emily.white@example.com",
    "sellerPhone": "+1 (555) 321-9876"
  },
  "description": "A large, elegant dining table made of high-quality wood.",
  "address": "1866 Sheridan Road",
  "availableFrom": "2023-07-01T00:00:00Z",
  "availableTo": "2023-07-31T00:00:00Z",
  "propertySize": 2500
}

obj12 = {
  "cardType": "furniture",
  "cardCategory": "kitchen",
  "title": "Buffet Storage Cabinet",
  "monthlyPrice": 200,
  "images": [
    "https://hawkinswoodshop.b-cdn.net/wp-content/uploads/2022/07/361e00deb5addd38051fdfec68fd5f74-700x700.jpg"
  ],
  "seller": {
    "sellerName": "Emily White",
    "sellerEmail": "emily.white@example.com",
    "sellerPhone": "+1 (555) 321-9876"
  },
  "description": "A large, mostly new buffet storage cabinet that's perfect for your kitchen.",
  "address": "1866 Sheridan Road",
  "availableFrom": "2023-07-01T00:00:00Z",
  "availableTo": "2023-07-31T00:00:00Z",
  "propertySize": 2500
}

obj13 = {
  "cardType": "property",
  "cardCategory": "apartment",
  "title": "Cozy Apartment Near Plex",
  "monthlyPrice": 3500,
  "images": [
    "https://images.realty.mx/a00d08994dac2ef65c0dacc9ec8e05dc/images/assets/1611_67028.jpg",
    "https://photos.zillowstatic.com/fp/ac11ba498ebe08af0b625462d511024e-cc_ft_1536.jpg"
  ],
  "seller": {
    "sellerName": "Jane Smith",
    "sellerEmail": "janesmith@example.com",
    "sellerPhone": "+1 (123) 456-7890"
  },
  "description": "Mid-sized apartment close to campus. Good for students working on campus!",
  "address": "638 Library Place",
  "numBathrooms": 2,
  "numBedrooms": 1,
  "amenities": [
    "Central heating",
    "In-unit laundry"
  ],
  "availableFrom": "2023-06-13T00:00:00Z",
  "availableTo": "2023-08-31T00:00:00Z",
  "propertySize": 2000
}

obj14 = {
  "cardType": "furniture",
  "cardCategory": "kitchen",
  "title": "Wooden Cutting Board",
  "monthlyPrice": 20,
  "images": [
    "https://www.ikea.com/us/en/images/products/proppmaett-cutting-board-beech__0711763_pe728455_s5.jpg",
    "https://www.ikea.com/us/en/images/products/proppmaett-cutting-board-beech__0896222_pe609819_s5.jpg"
  ],
  "seller": {
    "sellerName": "Emily White",
    "sellerEmail": "emily.white@example.com",
    "sellerPhone": "+1 (555) 321-9876"
  },
  "description": "Used wooden cutting board.",
  "address": "828 Clark Street",
  "availableFrom": "2023-06-13T00:00:00Z",
  "availableTo": "2023-08-31T00:00:00Z",
  "propertySize": 2500
}

obj15 = {
  "cardType": "furniture",
  "cardCategory": "living",
  "title": "IKEA Arkelstorp Desk",
  "monthlyPrice": 100,
  "images": [
    "https://www.ikea.com/us/en/images/products/arkelstorp-desk-black__0735967_pe740301_s5.jpg",
    "https://www.ikea.com/us/en/images/products/arkelstorp-desk-black__0802362_ph162375_s5.jpg"
  ],
  "seller": {
    "sellerName": "Bob Jones",
    "sellerEmail": "bobjones@example.com",
    "sellerPhone": "+1 (345) 678-9102"
  },
  "description": "IKEA desk made with two types of wood. Lightly used, minorscratches.",
  "address": "612 Noyes Street",
  "availableFrom": "2023-06-13T00:00:00Z",
  "availableTo": "2023-08-31T00:00:00Z",
  "propertySize": 2500
}



data = [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10, obj11, obj12, obj13, obj14, obj15]

for record in data:
    db.collection(u'ccTesting').add(record)

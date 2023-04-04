import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from faker import Faker
import random
import time

# Replace 'path/to/your-service-account-key.json' with the path to the JSON file you downloaded
cred = credentials.Certificate('catscradle-firebasetry5-firebase-adminsdk-heax2-c180b86046.json')

# Initialize the Firebase app
firebase_admin.initialize_app(cred)

# Create a Firestore client
db = firestore.client()

obj1 = {
    "id": "item1",
    "itemType": "Furniture",
    "itemTitle": "Velvet Sofa",
    "description": "A brand new velvet sofa with gold legs.",
    "rentPrice": 125.50,
    "condition": "New",
    "category": "Sofas",
    "type": None,
    "numBedrooms": None,
    "numBathrooms": None,
    "propertySize": None,
    "availableFrom": 1643788800,
    "availableTo": 1646380800,
    "images": [
        "https://cdn.shopify.com/s/files/1/1741/7529/products/2.jpg?v=1632835359", 
        "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_500/at%2F20200727_Burrow_velvet_01_V2_white_MN"
    ],
    "amenities": ["Wifi", "Free Parking"],
    "seller": {
        "uid": "seller001",
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "555-123-4567",
        "comms": {
            "twitter": "https://twitter.com/john_smith",
            "facebook": "https://www.facebook.com/john.smith"
        }
    },
    "location": {
        "latitude": 41.878113,
        "longitude": -87.629799
    },
    "createdAt": 1643548800,
    "updatedAt": 1643548800
}

obj2 = {
    "id": "item2",
    "itemType": "Property",
    "itemTitle": "Spacious 2 Bedroom Apartment",
    "description": "A spacious 2 bedroom apartment with a balcony and a view of the lake.",
    "rentPrice": 1500.00,
    "condition": None,
    "category": None,
    "type": "Apartment",
    "numBedrooms": 2,
    "numBathrooms": 1,
    "propertySize": "1000",
    "availableFrom": 1646304000,
    "availableTo": 1654089600,
    "images": [
        "https://images.rentals.ca/property-pictures/medium/mississauga-on/355475/apartment-15039684.jpg",
        "https://www.west-20.com/wp-content/uploads/sites/29/2023/03/2-bed-1072x536.jpg"
    ],
    "amenities": ["Swimming Pool", "Gym", "Laundry"],
    "seller": {
        "uid": "seller002",
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": None,
        "comms": {
            "twitter": None,
            "facebook": "https://www.facebook.com/jane.doe"
        }
    },
    "location": {
        "latitude": 37.7749,
        "longitude": -122.4194
    },
    "createdAt": 1645737600,
    "updatedAt": 1645737600
}

obj3 =  {
    "id": "item3",
    "itemType": "Furniture",
    "itemTitle": "Modern Sofa",
    "description": "A comfortable and stylish modern sofa in excellent condition.",
    "rentPrice": 50.00,
    "condition": "Used",
    "category": "Sofas",
    "type": None,
    "numBedrooms": None,
    "numBathrooms": None,
    "propertySize": None,
    "availableFrom": "2023-05-01T00:00:00.000Z",
    "availableTo": "2023-08-31T00:00:00.000Z",
    "images": [
      "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81QK5J2i6tL.jpg",
      "https://media1.popsugar-assets.com/files/thumbor/0O08jYEURCBhs-vfkGW1UxUqOF4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/09/24/656/n/1922794/4ed892fe8f27dd6e_netimgZJ8AW4/i/Best-Sectional-Sofa-Albany-Park-Park-Sectional-Sofa.jpg"
    ],
    "amenities": None,
    "seller": {
      "uid": "user1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "555-123-4567",
      "comms": {
        "twitter": "https://twitter.com/johndoe",
        "facebook": "https://facebook.com/johndoe"
      }
    },
    "location": {
      "latitude": 42.057389,
      "longitude": -87.674512
    },
    "createdAt": "2023-04-01T00:00:00.000Z",
    "updatedAt": "2023-04-01T00:00:00.000Z"
  }

obj4 = {
    "id": "item4",
    "itemType": "Property",
    "itemTitle": "Cozy Studio Apartment",
    "description": "A beautiful studio apartment in a great location with easy access to public transportation.",
    "rentPrice": 1000.00,
    "condition": None,
    "category": None,
    "type": "Studio",
    "numBedrooms": "0",
    "numBathrooms": "1",
    "propertySize": "500",
    "availableFrom": "2023-06-01T00:00:00.000Z",
    "availableTo": None,
    "images": [
      "https://cdn.onekindesign.com/wp-content/uploads/2015/04/Interior-TR-INT2-architecture-01-1-Kindesign.jpg",
      "https://storage.googleapis.com/gen-atmedia/2/2018/10/3074d6ec832b51a58eaa559465a308464e799d6f.jpeg"
    ],
    "amenities": ["gym", "laundry"],
    "seller": {
      "uid": "user2",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "555-987-6543",
      "comms": {
        "twitter": "https://twitter.com/janesmith",
        "facebook": "https://facebook.com/janesmith"
      }
    },
    "location": {
      "latitude": 42.058221,
      "longitude": -87.673256
    },
    "createdAt": "2023-04-02T00:00:00.000Z",
    "updatedAt": "2023-04-02T00:00:00.000Z"
  }


obj5 = {
    "id": "item5",
    "itemType": "Furniture",
    "itemTitle": "Vintage Wooden Chair",
    "description": "A beautiful vintage wooden chair with a unique design.",
    "rentPrice": 20.00,
    "condition": "Used",
    "category": "Chairs",
    "type": None,
    "numBedrooms": None,
    "numBathrooms": None,
    "propertySize": None,
    "availableFrom": "2023-05-10T00:00:00.000Z",
    "availableTo": "2023-09-10T00:00:00.000Z",
    "images": [
      "https://a.1stdibscdn.com/pair-of-antique-hoop-back-windsor-oak-armchairs-for-sale/f_17552/f_331588521678133138215/f_33158852_1678133138530_bg_processed.jpg?width=768",
      "https://cdn.shopify.com/s/files/1/1883/4283/products/OldIndianWoodenLowChairwithHandWovenTwineandCarvedMotifsYN6234_800x.jpg?v=1660259117"
    ],
    "amenities": None,
    "seller": {
      "uid": "user3",
      "name": "Lucas Brown",
      "email": "lucas.brown@example.com",
      "phone": "555-456-7890",
      "comms": {
        "twitter": "https://twitter.com/lucasbrown",
        "facebook": "https://facebook.com/lucasbrown"
      }
    },
    "location": {
      "latitude": 42.059033,
      "longitude": -87.672178
    },
    "createdAt": "2023-04-03T00:00:00.000Z",
    "updatedAt": "2023-04-03T00:00:00.000Z"
  }


obj6 = {
    "id": "item6",
    "itemType": "Furniture",
    "itemTitle": "Elegant Dining Table",
    "description": "A large, elegant dining table made of high-quality wood.",
    "rentPrice": 80.00,
    "condition": "New",
    "category": "Tables",
    "type": None,
    "numBedrooms": None,
    "numBathrooms": None,
    "propertySize": None,
    "availableFrom": "2023-05-15T00:00:00.000Z",
    "availableTo": "2023-08-15T00:00:00.000Z",
    "images": [
      "https://casapitti.com/wp-content/uploads/2021/06/7713_ambient.jpg",
      "https://cdn.shopify.com/s/files/1/1370/6459/products/GFXS0061-Edit-WEB.jpg?v=1615444415"
    ],
    "amenities": None,
    "seller": {
      "uid": "user4",
      "name": "Emily White",
      "email": "emily.white@example.com",
      "phone": "555-321-9876",
      "comms": {
        "twitter": "https://twitter.com/emilywhite",
        "facebook": "https://facebook.com/emilywhite"
      }
    },
    "location": {
      "latitude": 42.059845,
      "longitude": -87.671100
    },
    "createdAt": "2023-04-04T00:00:00.000Z",
    "updatedAt": "2023-04-04T00:00:00.000Z"
  }


data = [obj1,obj2, obj3, obj4, obj5, obj6]

for record in data:
    doc_ref = db.collection(u'Properties').document(record['itemTitle'])
    doc_ref.set(record)

# Initialize the Faker library
#fake = Faker()

# Generate a single fake data point
# def generate_fake_data():
#     item_type = random.choice(["Furniture", "Property"])
#     if item_type == "Furniture":
#         category = random.choice(["Chairs", "Sofas", "Tables", "etc.", None])
#         prop_type = None
#     else:
#         category = None
#         prop_type = random.choice(["Apartment", "Studio", "House", "etc.", None])

#     data = {
#         "id": fake.uuid4(),
#         "itemType": item_type,
#         "itemTitle": fake.catch_phrase(),
#         "description": fake.text(),
#         "price": round(random.uniform(50, 2000), 2),
#         "condition": random.choice(["New", "Used", None]),
#         "category": category,
#         "type": prop_type,
#         "numBedrooms": random.choice([str(random.randint(1, 5)), None]),
#         "numBathrooms": random.choice([str(random.randint(1, 3)), None]),
#         "propertySize": random.choice([str(random.randint(500, 5000)), None]),
#         "availableFrom": fake.date_this_decade(),
#         "availableTo": fake.date_between(start_date="+30d", end_date="+365d"),
#         "images": [fake.image_url() for _ in range(3)],
#         "amenities": [fake.word() for _ in range(2)],
#         "seller": {
#             "uid": fake.uuid4(),
#             "name": fake.name(),
#             "email": fake.email(),
#             "phone": fake.phone_number(),
#             "comms": {
#                 "twitter": fake.url(),
#                 "facebook": fake.url(),
#             },
#         },
#         "address": fake.street_address(),
#         "createdAt": time.time(),
#         "updatedAt": time.time(),
#     }
#     return data

# # Generate and send 6 fake data points to Firestore
# for _ in range(6):
#     data = generate_fake_data()
#     doc_ref = db.collection('your_collection_name').document()
#     doc_ref.set(data)
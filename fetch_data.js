// Import Firestore database
import db from './firebase';
import { useState } from 'react';
import './read.css';

const Read = () => {

	const [info , setInfo] = useState([]);

	// Start the fetch operation as soon as
	// the page loads
	// window.addEventListener('load', () => {
	// 	Fetchdata();
	// });
    Fetchdata()

	// Fetch the required data using the get() method
	const Fetchdata = ()=>{
		db.collection("Properties").get().then((querySnapshot) => {
			
			// Loop through the data and store
			// it in array to display
			querySnapshot.forEach(element => {
				var data = element.Properties();
				setInfo(arr => [...arr , data]);
				
			});
		})
	}
	
	// Display the result on the page
	// return (
	// 	Properties.itemType
	// );
    console.log(Properties.itemType);
}

Read()

export default Read;

import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Listing from './components/Listing';
import Listing_details from './components/Listing_details';
import Homepage from './components/Homepage';



const App = (props) => {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <p> testing </p>
      <Route exact path="/" component={Homepage} />
      <Route path="/listing" component={Listing} />
    </BrowserRouter>
    // < Listing document={props.documents[0]}/>
    // <Homepage/>
  );
};

export default App;

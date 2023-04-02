import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Listing from "./components/Listing";
import Listing_details from "./components/Listing_details";
import Homepage from "./components/Homepage";

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* < Listing document={props.documents[0]}/> */}
      {/* <Listing document={props.documents[0]}/> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Homepage} />
          <Route exact path="/listing" Component={Listing} />
          {/* <Route exact path="/listing" Component={Listing} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

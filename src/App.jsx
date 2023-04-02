import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Listing from "./components/Listing";
import Homepage from "./components/HomePage";

function App(props) {
  return (
    <div>
      {/* < Listing document={props.documents[0]}/> */}
      {/* <Listing document={props.documents[0]}/> */}
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" Component={Homepage} /> */}

          <Route path="/" element={<Homepage props={props} />} />
          <Route exact path="/listing" Component={Listing} />
          {/* <Route exact path="/listing" Component={Listing} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

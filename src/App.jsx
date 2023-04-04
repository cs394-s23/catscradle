import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Listing from "./components/Listing";
import Homepage from "./components/HomePage";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route exact path="/listing" Component={Listing} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

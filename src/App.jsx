import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Listing from "./components/listings/Listing";
import Homepage from "./components/homepage/HomePage";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import Upload from "./components/misc/Upload";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route exact path="/listing" Component={Listing} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/upload" Component={Upload} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

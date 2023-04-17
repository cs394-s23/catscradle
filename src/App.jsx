import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Listing from "./components/listings/Listing";
import Homepage from "./components/homepage/HomePage";

import Login from "./components/authentication/Login";
import Upload from "./components/misc/Upload";

function App() {
  const name = localStorage.getItem("name");

  if (name) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/login" Component={Login} />
            <Route exact path="/listing" Component={Listing} />

            <Route exact path="/upload" Component={Upload} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Login} />
            <Route exact path="/listing" Component={Listing} />
            <Route path="/login" Component={Login} />
            <Route exact path="/upload" Component={Upload} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

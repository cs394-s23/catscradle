import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Listing from "./components/Listing";
import Homepage from "./components/HomePage";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/homepage" Component={Homepage} />
          <Route exact path="/listing" Component={Listing} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

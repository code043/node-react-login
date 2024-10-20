import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<Forgot />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

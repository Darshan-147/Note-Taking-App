import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Notes from "./pages/Notes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<ProtectedRoute element={<Notes />} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    
  );
};

export default App;

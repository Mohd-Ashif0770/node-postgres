import React from "react";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { loading } = useAuth()
 
 if(loading) return(
  <p className="text-xl text-gray-700 text-center">Loading...</p>
 )

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <h2 className="text-3xl font-bold mt-20">404 - Page not found</h2>
          }
        />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "../src/Pages/index";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Signup, Home, Board } from "../src/Pages/index";
import { Header, PrivateRoute } from "./Components/index";
function App() {
  return (
    <div className="App">
      <Routes>
        <div className="h-full flex flex-col">
          <Header />
          <Routes>
            <PrivateRoute path="/" element={<Home />} />
            <PrivateRoute path="/board/:boardId" element={<Board />} />
          </Routes>
        </div>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

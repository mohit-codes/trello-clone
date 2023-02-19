import React from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Login, Signup, Home, Board, Project } from "../src/Pages/index";
import { If } from "./Components/If";
import { Header, PrivateRoute } from "./Components/index";
import { HEADER_IGNORE_ROUTES } from "./util/constant";

function App() {
  const location = useLocation();

  return (
    <div className="App h-full flex flex-col">
      <If condition={!HEADER_IGNORE_ROUTES.includes(location.pathname)}>
        <Header />
      </If>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/board/:boardId" element={<PrivateRoute />}>
          <Route path="/board/:boardId" element={<Board />} />
        </Route>
        <Route path="/project/:projectId" element={<PrivateRoute />}>
          <Route path="/project/:projectId" element={<Project />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

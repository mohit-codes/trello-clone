import { Routes, Route } from "react-router-dom";
import { Login } from "../src/Pages/index";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

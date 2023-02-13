import { Routes, Route } from "react-router-dom";
import Basic from "./pages/basic";
import Advanced from "./pages/advanced";

function App() {
  return (
    <Routes>
      <Route path="/basic" element={<Basic />} />
      <Route path="/advanced" element={<Advanced />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import SendNova from "./pages/sendNova";
import SendNovaUX from "./pages/sendNovaUX";

function App() {
  return (
    <Routes>
      <Route path="/sendNova" element={<SendNova />} />
      <Route path="/sendNovaUX" element={<SendNovaUX />} />
    </Routes>
  );
}

export default App;

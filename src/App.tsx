import { Routes, Route } from "react-router-dom";
import SendToken from "./pages/sendToken";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SendToken network="nova" />} />
      <Route path="/sendNova" element={<SendToken network="nova" />} />
      <Route path="/sendAtom" element={<SendToken network="cosmos" />} />
    </Routes>
  );
}

export default App;

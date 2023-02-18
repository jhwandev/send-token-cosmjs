import { Navigate, Routes, Route } from "react-router-dom";

import TokenSender from "pages/tokenSender";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/token/nova" />} />
      <Route path="/token/nova" element={<TokenSender network="nova" />} />
      <Route path="/token/atom" element={<TokenSender network="cosmos" />} />
    </Routes>
  );
}

export default App;

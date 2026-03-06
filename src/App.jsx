import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

// main app component
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* these are my pages */}
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
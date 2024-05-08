import { Routes, Route, BrowserRouter } from "react-router-dom";

// Page component
import LandingPage from "../pages/LandingPage";
import { SearchPage } from "../pages/SearchPage";
import LayoutPage from "../pages/LayoutPage";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/searchpage" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

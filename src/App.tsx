import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Page";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/admin/Page";
import FeedsPage from "./pages/feeds/Page";

const App = () => {
  return (
    <div className="min-h-screen" data-theme="light">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/feeds/:id" element={<FeedsPage />} />
      </Routes>
    </div>
  );
};

export default App;

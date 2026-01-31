import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

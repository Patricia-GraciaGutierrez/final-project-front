import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import CVEdit from "./pages/Dashboard/CV/CVEdit";
import CVPublic from "./pages/CVPublic/CVPublic";
import Projects from "./pages/Dashboard/Projects/Projects";
import ContactEdit from "./pages/Dashboard/Contact/ContactEdit";
import Info from "./pages/Dashboard/Info/Info";
import NotFound from "./pages/NotFound/NotFound";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  const location = useLocation();
  const isPublicCVPage = location.pathname.startsWith('/paginaprofesional/');

  return (
    <div className="App">
      {!isPublicCVPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
        <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />

        {/* Rutas privadas bajo /dashboard */}
        <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>}>
          <Route index element={<Navigate to="info" replace />} />
          <Route path="info" element={<Info />} />
          <Route path="curriculum" element={<CVEdit />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<ContactEdit />} />
        </Route>

        {/* Rutas accesibles sin autenticación */}
        <Route path="/paginaprofesional/:id" element={<CVPublic />} />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isPublicCVPage && <Footer />}
    </div>
  );
}

export default App;
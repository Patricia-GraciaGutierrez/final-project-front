import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import CVEdit from "./pages/CV/CVEdit";
import CVPreview from "./pages/CV/CVPreview";
import PortfolioList from "./pages/Portfolio/PortfolioList";
import PortfolioDetail from "./pages/Portfolio/PortfolioDetail";
import PortfolioEdit from "./pages/Portfolio/PortfolioEdit";
import ContactEdit from "./pages/Contact/ContactEdit";
import NotFound from "./pages/NotFound/NotFound";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
        <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />

        {/* Rutas privadas */}
        <Route path="/profile/edit" element={<IsPrivate><ProfileEdit /></IsPrivate>} />
        <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route path="/cv/edit" element={<IsPrivate><CVEdit /></IsPrivate>} />
        <Route path="/portfolio" element={<IsPrivate><PortfolioList /></IsPrivate>} />
        <Route path="/portfolio/:id" element={<IsPrivate><PortfolioDetail /></IsPrivate>} />
        <Route path="/portfolio/:id/edit" element={<IsPrivate><PortfolioEdit /></IsPrivate>} />
        <Route path="/contact/edit" element={<IsPrivate><ContactEdit /></IsPrivate>} />

        {/* Rutas accesibles sin autenticación */}
        <Route path="/cv/preview" element={<CVPreview />} />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

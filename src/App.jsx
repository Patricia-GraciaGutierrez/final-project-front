import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import CVEdit from "./pages/Dashboard/CV/CVEdit";
import CVPreview from "./pages/Dashboard/CV/CVPreview";
import CVPublic from "./pages/CVPublic/CVPublic";
import PortfolioList from "./pages/Dashboard/Portfolio/PortfolioList";
import PortfolioDetail from "./pages/Dashboard/Portfolio/PortfolioDetail";
import PortfolioEdit from "./pages/Dashboard/Portfolio/PortfolioEdit";
import ContactEdit from "./pages/Dashboard/Contact/ContactEdit";
import Info from "./pages/Dashboard/Info/Info";
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
          <Route path="/dashboard" element={<IsPrivate><Dashboard /></IsPrivate>} />
          <Route path="/dashboard/cv/edit" element={<IsPrivate><CVEdit /></IsPrivate>} />
          <Route path="/dashboard/cv/preview" element={<IsPrivate><CVPreview /></IsPrivate>} />
          <Route path="/dashboard/contact/edit" element={<IsPrivate><ContactEdit /></IsPrivate>} />
          <Route path="/dashboard/info" element={<IsPrivate><Info /></IsPrivate>} />
          <Route path="/dashboard/portfolio" element={<IsPrivate><PortfolioList /></IsPrivate>} />
          <Route path="/dashboard/portfolio/:id" element={<IsPrivate><PortfolioDetail /></IsPrivate>} />
          <Route path="/dashboard/portfolio/:id/edit" element={<IsPrivate><PortfolioEdit /></IsPrivate>} />

          {/* Rutas accesibles sin autenticación */}
          <Route path="/cv/:id" element={<CVPublic />} />

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
  );
}

export default App;


// import route 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header.jsx";
import Contact from "../src/components/Contact/Contact.jsx";
import Contributor from '../src/components/Team/Contributor.jsx'
import Home from '../src/components/Home.jsx'
function App() {
  return (<>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Contributor />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </>
  );
}

export default App;
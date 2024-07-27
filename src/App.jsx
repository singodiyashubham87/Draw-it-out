
// import route 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from '../src/components/Contact/Contact.jsx'
// import download icon

import Footer from "./components/Footer";
import Home from "./components/Home.jsx";
import Header from "./components/Header.jsx";
import Contributor from "./components/Team/Contributor.jsx";

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

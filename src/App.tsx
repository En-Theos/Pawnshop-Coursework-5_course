import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import {MainPage, GoldPage, SilverPage} from "./pages"

import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/evaluation/gold" element={<GoldPage/>}/>
          <Route path="/evaluation/silver" element={<SilverPage/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {MainPage, GoldPage, SilverPage, TechniquePage, WristwatchPage, AntiquesPage} from "./pages"

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
          <Route path="/evaluation/technique" element={<TechniquePage/>}/>
          <Route path="/evaluation/wristwatch" element={<WristwatchPage/>}/>
          <Route path="/evaluation/antiques" element={<AntiquesPage/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {MainPage, GoldPage, SilverPage, TechniquePage, WristwatchPage, AntiquesPage, AuctionPage, LotPage, ShopPage} from "./pages"

import Header from "./components/header";
import Footer from "./components/footer";
import Modal from "./components/modal";

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
          <Route path="/auction" element={<AuctionPage/>}/>
          <Route path="/auction/single/:id" element={<LotPage/>}/>
          <Route path="/shop/single/:id" element={<LotPage/>}/>
          <Route path="/single/:id" element={<LotPage/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
        </Routes>
        <Footer />
        <Modal />
      </div>
    </Router>
  );
}

export default App;

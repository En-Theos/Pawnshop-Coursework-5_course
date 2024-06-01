import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { MainPage, GoldPage, SilverPage, TechniquePage, WristwatchPage, AntiquesPage, AuctionPage, LotPage, ShopPage, CompanyPage, ContactsPage, RegisterPage, LoginPage, UserPage } from "./pages"

import Header from "./components/header";
import Footer from "./components/footer";
import Modal from "./components/modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "./slices/user";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("http://localhost:3001/auth/refresh", {withCredentials: true})
      .then((response) => {
        window.localStorage.setItem("token", "Bearer " + response.data.accessToken)
        
        dispatch(setData(response.data.user))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/evaluation/gold" element={<GoldPage />} />
          <Route path="/evaluation/silver" element={<SilverPage />} />
          <Route path="/evaluation/technique" element={<TechniquePage />} />
          <Route path="/evaluation/wristwatch" element={<WristwatchPage />} />
          <Route path="/evaluation/antiques" element={<AntiquesPage />} />
          <Route path="/auction" element={<AuctionPage />} />
          <Route path="/auction/single/:id" element={<LotPage />} />
          <Route path="/shop/single/:id" element={<LotPage />} />
          <Route path="/single/:id" element={<LotPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
        <Footer />
        <Modal />
      </div>
    </Router>
  );
}

export default App;

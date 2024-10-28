import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import Shop from "./pages/Shop/Shop";
import ItemShop from "./pages/Shop/ItemShop";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import AuthorProfile from "./pages/AuthorProfile/AuthorProfile";
import Checkout from "./pages/Checkout/Checkout";
import History from "./pages/Checkout/History";
import { useState } from "react";
//admin
import { ManagaerBook } from "./pages/Admin/AdminPage/ManagerBook/ManagaerBook";
import { ManagaerCustomer } from "./pages/Admin/AdminPage/ManagerCustomer/ManagerCustomer";
import NavAdmin from "./pages/Admin/AdminLayout/NavAdmin";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSetIsAdmin = (isAdmin: boolean) => {
    setIsAdmin(isAdmin);
  };

  return (
    <Router>
      {/* Hiển thị Header nếu không phải là Admin */}
      {!isAdmin && <Header />}

      <Routes>
        <Route path="/" element={<Home setIsAdmin={handleSetIsAdmin} />} />
        <Route path="/home" element={<Home setIsAdmin={handleSetIsAdmin} />} />
        <Route
          path="/contact"
          element={<Contact setIsAdmin={handleSetIsAdmin} />}
        />
        <Route
          path="/about"
          element={<About setIsAdmin={handleSetIsAdmin} />}
        />
        <Route path="/blog" element={<Blog setIsAdmin={handleSetIsAdmin} />} />
        <Route path="/shop" element={<Shop setIsAdmin={handleSetIsAdmin} />} />
        <Route
          path="/wishlist"
          element={<Wishlist setIsAdmin={handleSetIsAdmin} />}
        />
        <Route path="/cart" element={<Cart setIsAdmin={handleSetIsAdmin} />} />
        <Route
          path="/checkout"
          element={<Checkout setIsAdmin={handleSetIsAdmin} />}
        />
        <Route
          path="/history/:userId"
          element={<History setIsAdmin={handleSetIsAdmin} />}
        />
        <Route
          path="/shop/:ItemId"
          element={<ItemShop setIsAdmin={handleSetIsAdmin} />}
        />
        <Route
          path="/AuthorProfile/:AuthorId"
          element={<AuthorProfile setIsAdmin={handleSetIsAdmin} />}
        />
        {/* giao dien admin */}
        <Route
          path="/admin"
          element={<NavAdmin setIsAdmin={handleSetIsAdmin} />}
        />

        <Route
          path="/admin/ManagerBook"
          element={<ManagaerBook setIsAdmin={handleSetIsAdmin} />}
        />
        <Route
          path="/admin/ManagerCustomer"
          element={<ManagaerCustomer setIsAdmin={handleSetIsAdmin} />}
        />
      </Routes>
      {!isAdmin && <Footer />}
    </Router>
  );
};

export default App;

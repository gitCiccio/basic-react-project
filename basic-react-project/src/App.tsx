import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Auth from "./pages/Auth.tsx";
import Checkout from "./pages/Checkout.tsx";
import Navbar from "./components/Navbar.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import { CartProvider } from "./context/CartContext";

function App() {

  return <AuthProvider>
    <CartProvider>
      <div className={"app"}>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />}></Route>
          <Route path={"/auth"} element={<Auth />}></Route>
          <Route path={"/checkout"} element={<Checkout />}></Route>
          <Route path={"/product/:id"} element={<ProductDetails />}></Route>
        </Routes>
      </div>
    </CartProvider>
  </AuthProvider>
}

export default App

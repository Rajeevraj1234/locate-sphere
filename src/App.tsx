import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Navbar from "./Components/Navbar";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import UploadItem from "./Pages/UploadItem";
import Allproducts from "./Pages/Allproducts";
import Product from "./Pages/Product";
import History from "./Pages/History";
import Feedback from "./Pages/Feedback";
import Footer from "./Components/Footer";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload-product" element={<UploadItem />} />
        <Route path="/products" element={<Allproducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/history" element={<History />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;

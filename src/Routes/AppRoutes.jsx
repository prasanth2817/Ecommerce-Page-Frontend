import { Route, Routes } from "react-router-dom";
import Header from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductPage from "../Components/ProductPage";
import SignUp from "../UserPages/CreateUser";
import Login from "../UserPages/Login";
import ForgotPassword from "../UserPages/ForgotPassword";
import ResetPassword from "../UserPages/ResetPassword";

function AppRoutes() {
  return (
    <>
    <Header /> 
    <Routes>
      <Route path="/productpage" element={<ProductPage />} /> 
      {/* <Route path="/login" element={<Login />} /> 
      <Route path="/signUp" element={<SignUp />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />  */}
      <Route path="/" element={<ProductPage />} /> 
    </Routes>
    <Footer />
    </>
  );
}

export default AppRoutes;
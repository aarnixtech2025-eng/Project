import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BuyerLayout from "./components/Layouts/BuyerLayout";
import SellerLayout from "./components/Layouts/SellerLayout";

import FinalHero from './components/Hero/FinalHero';
import SignInOrCreateAccount from './components/Signin&signup/SignInOrCreateAccount';
import SetupAccount from './components/Signin&signup/SetupAccount';
import ResetPassword from './components/Signin&signup/ResetPassword';
import CategoryPage from './components/CategoryPage';
import SubCategoryPage from './components/SubCategoryPage';
import AllCategories from './components/AllCategories';
import EnquiryForm from "./components/EnquiryForm .jsx";

import CreateAnAccount from "./components/CreateAnAccount";
import Seller from "./components/Seller/Seller";
import BusinessProfile from "./components/BusinessProfile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BankDetails from "./components/BankDetails.jsx";
import ManageUser from "./components/ManageUser.jsx";

function App() {
  return (
    
      <Routes>

        {/* BUYER ROUTES → Navbar visible */}
        <Route element={<BuyerLayout />}>
          <Route path="/" element={<FinalHero />} />
          <Route path="/login" element={<SignInOrCreateAccount />} />
          <Route path="/signup" element={<SetupAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/categories/:id" element={<SubCategoryPage />} />
          <Route path="/enquiry-form" element={<EnquiryForm />} />
        </Route>

        {/* SELLER ROUTES → No Navbar */}
        <Route element={<SellerLayout />}>
          <Route path="/seller" element={<CreateAnAccount />} />
          <Route path="/CreateAccount" element={<Seller />} />
        </Route>
        <Route path="/seller/business-profile" element={<BusinessProfile />} />
        <Route path="/seller/user-profile" element={<Dashboard />} />
        <Route path="/seller/bank-details" element={<BankDetails />} />
        <Route path="/seller/manage-users" element={<ManageUser />} />
      </Routes>
    
  );
}

export default App;

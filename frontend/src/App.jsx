// import { Routes, Route } from 'react-router-dom';
// import FinalNavbar from './components/Navbar/FinalNavbar';
// import FinalHero from './components/Hero/FinalHero';
// import SetupAccount from './components/Signin&signup/SetupAccount';
// import SignInOrCreateAccount from './components/Signin&signup/SignInOrCreateAccount';
// import ResetPassword from './components/Signin&signup/ResetPassword';
// import CategoryPage from './components/CategoryPage';
// import SubCategoryPage from './components/SubCategoryPage';
// import Footer from './components/footer';
// import AllCategories from './components/AllCategories';
// import EnquiryForm from './components/EnquiryForm ';
// import AddProducts from './components/SellerDashboard/AddProducts';
// function App() {
//   return (
//     <>
//       <FinalNavbar />

//       <Routes>
//         <Route path="/" element={<FinalHero />} />
//         <Route path="/login" element={<SignInOrCreateAccount />} />
//         <Route path="/signup" element={<SetupAccount />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* Page with scroller + View All button */}
//         <Route path="/categories" element={<CategoryPage />} />

//         {/* 🔹 View All → This one */}
//         <Route path="/all-categories" element={<AllCategories />} />

//         {/* Category details page */}
//         <Route path="/categories/:id" element={<SubCategoryPage />} />
//         <Route path="/enquiry-form" element={<EnquiryForm />} />

//         {/* ****************************************************************** */}
// <Route path="/add-products" element={<AddProducts/>}/>

//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;


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



import CreateAnAccount from "./components/SellerDashboard/CreateAnAccount.jsx";
import Seller from "./components/SellerDashboard/Seller.jsx";
import BusinessProfile from "./components/SellerDashboard/BusinessProfile.jsx";
import Dashboard from "./components/SellerDashboard/BankDetails.jsx";
import BankDetails from "./components/SellerDashboard/BankDetails.jsx";
import AddProducts from "./components/SellerDashboard/AddProducts.jsx";

// import Seller from "./components/Seller/Seller";
// import BusinessProfile from "./components/BusinessProfile.jsx";
// import Dashboard from "./components/Dashboard.jsx";
// import BankDetails from "./components/Bank Details.jsx";
// import ManageUser from "./components/ManageUser.jsx";

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
          <Route path="/seller" element={<CreateAnAccount/>} />
          <Route path="/CreateAccount" element={<Seller/>} />
          <Route path="/AddProduct" element={<AddProducts/>}></Route>
        </Route>
        <Route path="/seller/business-profile" element={<BusinessProfile/>} />
        <Route path="/seller/user-profile" element={<Dashboard/>} />
        <Route path="/seller/bank-details" element={<BankDetails/>} />
        
        
      </Routes>
    
  );
}

export default App;





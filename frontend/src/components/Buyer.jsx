import { Routes, Route } from 'react-router-dom';
import FinalNavbar from './Navbar/FinalNavbar';
import FinalHero from './Hero/FinalHero';
import SetupAccount from './Signin&signup/SetupAccount';
import SignInOrCreateAccount from './Signin&signup/SignInOrCreateAccount';
import ResetPassword from './Signin&signup/ResetPassword';
import CategoryPage from './CategoryPage';
import SubCategoryPage from './SubCategoryPage';
import AllCategories from './AllCategories';
import EnquiryForm from './EnquiryForm ';



function Buyer() {
  return (
   
      <>
        <FinalNavbar />
        <Routes>
        <Route path="/" element={<FinalHero />} />
        <Route path="/login" element={<SignInOrCreateAccount />} />
        <Route path="/signup" element={<SetupAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Page with scroller + View All button */}
        <Route path="/categories" element={<CategoryPage />} />

        {/* 🔹 View All → This one */}
        <Route path="/all-categories" element={<AllCategories />} />

        {/* Category details page */}
        <Route path="/categories/:id" element={<SubCategoryPage />} />
        <Route path="/enquiry-form" element={<EnquiryForm/>}/>

          </Routes>
      </>
  );
}

export default Buyer;

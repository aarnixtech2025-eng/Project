import { Routes, Route } from 'react-router-dom';
import FinalNavbar from './components/Navbar/FinalNavbar';
import FinalHero from './components/Hero/FinalHero';
import SetupAccount from './components/Signin&signup/SetupAccount';
import SignInOrCreateAccount from './components/Signin&signup/SignInOrCreateAccount';
import ResetPassword from './components/Signin&signup/ResetPassword';
import CategoryPage from './components/CategoryPage';
import SubCategoryPage from './components/SubCategoryPage';
import Footer from './components/footer';
import AllCategories from './components/AllCategories';
import EnquiryForm from './components/EnquiryForm ';

function App() {
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

      <Footer />
    </>
  );
}

export default App;

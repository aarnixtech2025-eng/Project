import FinalNavbar from "../Navbar/FinalNavbar";
import Footer from "../footer";
import { Outlet } from "react-router-dom";

export default function BuyerLayout() {
  return (
    <>
      <FinalNavbar />
      <Outlet />   {/* All buyer pages render here */}
      <Footer />
    </>
  );
}

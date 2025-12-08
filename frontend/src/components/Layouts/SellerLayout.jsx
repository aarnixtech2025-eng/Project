import Footer from "../footer";
import { Outlet } from "react-router-dom";

export default function SellerLayout() {
  return (
    <>
      <Outlet />  {/* Only seller pages, no navbar */}
      <Footer />
    </>
  );
}

import { Routes, Route } from 'react-router-dom';
import Seller from './Seller/Seller';
import CreateAnAccount from './CreateAnAccount';
export default function SellerRoutes() {
  return (
    <>
     <Routes>
    
           <Route path="/seller" element={<CreateAnAccount/>}/>
           <Route path="/CreateAccount" element={<Seller/>}></Route>
      </Routes>
    </>
  );
}

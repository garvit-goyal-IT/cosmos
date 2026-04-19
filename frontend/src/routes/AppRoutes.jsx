import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import PartnerLogin from "../pages/PartnerLogin.jsx"
import PartnerRegister from "../pages/PartnerRegister.jsx";
  

const AppRoutes=()=>{
    return(
        <>
         <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister/>} />
                <Route path="/user/login" element={<UserLogin/>} />
                <Route path="/foodPartner/login" element={<PartnerLogin/>} />
                <Route path="/foodPartner/register" element={<PartnerRegister/>} />
            </Routes>   
        </Router>
        </>
    )
}
export default AppRoutes;
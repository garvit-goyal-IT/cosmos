import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin.jsx";
import UserRegister from "../pages/auth/UserRegister.jsx";
import PartnerLogin from "../pages/auth/PartnerLogin.jsx"
import PartnerRegister from "../pages/auth/PartnerRegister.jsx";
import Home from "../pages/general/Home.jsx";  
import CreateFood from "../pages/food-partner/CreateFood.jsx";
const AppRoutes=()=>{
    return(
        <>
         <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/user/register" element={<UserRegister/>} />
                <Route path="/user/login" element={<UserLogin/>} />
                <Route path="/foodPartner/login" element={<PartnerLogin/>} />
                <Route path="/foodPartner/register" element={<PartnerRegister/>} />
                <Route path="/createFood" element={<CreateFood/>} />
            </Routes>   
        </Router>
        </>
    )
}
export default AppRoutes;
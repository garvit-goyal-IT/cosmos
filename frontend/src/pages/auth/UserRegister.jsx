import AuthForm from "../../components/AuthForm";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

  const navigate=useNavigate();
  const handleSubmit = async (e) => {
  
      e.preventDefault()

     const formData= new FormData(e.target);


      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const password = formData.get("password");

    try {
      const response= await axios.post("http://localhost:3000/api/auth/user/register",{
        fullName,
        email,
        password},
        {withCredentials:true}
      )
  
      console.log(response?.data);
      navigate('/')
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  }
  return (
    <AuthForm
      title="User Register"
      fields={[
        { type: "text", placeholder: "Full Name" , name: "fullName"},
        { type: "email", placeholder: "Email", name:  "email" },
        { type: "password", placeholder: "Password", name: "password" },
      ]}
      buttonText="Register"
      onSubmit={handleSubmit}
      switchText="Already have an account?"
      onSwitch={() => (window.location.href = "/user/login")}
    />
  );
};

export default UserRegister;
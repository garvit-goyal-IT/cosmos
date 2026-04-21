import AuthForm from "../../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PartnerLogin = () => {
    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
      e.preventDefault();

      const fromData= new FormData(e.target);
      const email= fromData.get("email");
      const password= fromData.get("password");

      axios.post('http://localhost:3000/api/auth/foodPartner/login',{
        email,password
      },{
        withCredentials: true
      })
      .then(()=>navigate("/createFood"))
      .catch((err)=>console.error("Login failed:", err));
    }
  return (
    <AuthForm
      title="Partner Login"
      fields={[
        { type: "email", placeholder: "Email", name: "email" },
        { type: "password", placeholder: "Password" , name:"password"},
      ]}
      buttonText="Login"
      switchText="New partner?"
      onSubmit={handleSubmit}
      onSwitch={() => (window.location.href = "/foodPartner/register")}
    />
  );
};

export default PartnerLogin;
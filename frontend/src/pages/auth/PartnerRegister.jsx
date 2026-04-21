import AuthForm from "../../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PartnerRegister = () => {
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const restaurantName = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      
        await axios.post("http://localhost:3000/api/auth/foodPartner/register", {
          name: restaurantName,
          email,
          password
        },{
          withCredentials: true
        })
        .then(()=>navigate("/createFood"))
        .catch((err)=>console.error("Registration failed:", err));
    }

  return (
    <AuthForm
      title="Partner Register"
      fields={[
        { type: "text", placeholder: "Restaurant Name" ,name: "name"},
        { type: "email", placeholder: "Email" ,name:"email"},
        { type: "password", placeholder: "Password" ,name:"password"},
      ]}
      buttonText="Register"
      switchText="Already registered?"
      onSubmit={handleSubmit}
      onSwitch={() => (window.location.href = "/foodPartner/login")}
    />
  );
};

export default PartnerRegister;
import axios from "axios";
import AuthForm from "../../components/AuthForm";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData= new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const response= await axios.post("http://localhost:3000/api/auth/user/login",{
      email,password},{
        withCredentials:true
      }
    )
    navigate('/')

  }
  return (
    <AuthForm
      title="User Login"
      fields={[
        { type: "email", placeholder: "Email" },
        { type: "password", placeholder: "Password" },
      ]}
      onSubmit={handleSubmit}
      buttonText="Login"
      switchText="Don't have an account?"
      onSwitch={() => (window.location.href = "/user/register")}
    />
  );
};

export default UserLogin;
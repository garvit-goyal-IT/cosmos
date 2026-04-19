import AuthForm from "../components/AuthForm";

const UserRegister = () => {
  return (
    <AuthForm
      title="User Register"
      fields={[
        { type: "text", placeholder: "Full Name" },
        { type: "email", placeholder: "Email" },
        { type: "password", placeholder: "Password" },
      ]}
      buttonText="Register"
      switchText="Already have an account?"
      onSwitch={() => (window.location.href = "/user/login")}
    />
  );
};

export default UserRegister;
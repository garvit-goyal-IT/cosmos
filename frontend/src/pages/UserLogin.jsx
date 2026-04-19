import AuthForm from "../components/AuthForm";

const UserLogin = () => {
  return (
    <AuthForm
      title="User Login"
      fields={[
        { type: "email", placeholder: "Email" },
        { type: "password", placeholder: "Password" },
      ]}
      buttonText="Login"
      switchText="Don't have an account?"
      onSwitch={() => (window.location.href = "/user/register")}
    />
  );
};

export default UserLogin;
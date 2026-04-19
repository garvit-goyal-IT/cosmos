import AuthForm from "../components/AuthForm";

const PartnerLogin = () => {
  return (
    <AuthForm
      title="Partner Login"
      fields={[
        { type: "email", placeholder: "Email" },
        { type: "password", placeholder: "Password" },
      ]}
      buttonText="Login"
      switchText="New partner?"
      onSwitch={() => (window.location.href = "/foodPartner/register")}
    />
  );
};

export default PartnerLogin;
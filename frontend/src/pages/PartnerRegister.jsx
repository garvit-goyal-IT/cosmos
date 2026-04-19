import AuthForm from "../components/AuthForm";

const PartnerRegister = () => {
  return (
    <AuthForm
      title="Partner Register"
      fields={[
        { type: "text", placeholder: "Restaurant Name" },
        { type: "email", placeholder: "Email" },
        { type: "password", placeholder: "Password" },
      ]}
      buttonText="Register"
      switchText="Already registered?"
      onSwitch={() => (window.location.href = "/foodPartner/login")}
    />
  );
};

export default PartnerRegister;
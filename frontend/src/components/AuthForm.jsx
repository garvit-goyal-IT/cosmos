import "../styles/styles.css";

const AuthForm = ({ title, fields, buttonText, switchText, onSwitch }) => {
  return (
    <div className="wrapper">
      <div className="container">
        <h2>{title}</h2>

        {fields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}

        <button>{buttonText}</button>

        <div className="switch">
          {switchText}{" "}
          <span onClick={onSwitch}>Click here</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
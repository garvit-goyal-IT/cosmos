import "../styles/styles.css";

const AuthForm = ({ title, fields, buttonText, switchText, onSwitch, onSubmit }) => {
  return (
    <div className="wrapper">
      <div className="container">
        <h2>{title}</h2>

        <form onSubmit={onSubmit}>   

          {fields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}  
              required
            />
          ))}

          <button type="submit">{buttonText}</button>

        </form>

        <div className="switch">
          {switchText}{" "}
          <span onClick={onSwitch}>Click here</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
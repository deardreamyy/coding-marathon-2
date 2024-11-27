import { useSignup } from "../hooks/useSignup";

const SignUpPage = ({ setIsAuthenticated }) => {

  const { email, password, password2, setEmail, setPassword, setPassword2, handleSignup } = useSignup({ setIsAuthenticated });

  return (
    <section>
    <div className="form-container">
      <h2>Signup</h2>
      <label>
        email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
    </section>
  );
};

export default SignUpPage;

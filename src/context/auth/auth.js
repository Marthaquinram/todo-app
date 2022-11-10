import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../globalContext';


const AuthBoxy = (register) => {
  console.log("register", register);
  const { getCurrentUser, user } = useGlobalContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false); // by default false until the button is clicked, true
  const [errors, setErrors] = React.useState({});
  // console.log("HEYYYYYY", setErrors)

  React.useEffect(() => {
    if (user && navigate) {
      navigate("/dashboard");
    }
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //this will send data to our api
    let data = {};

    if (register) {
      data = {
        name,
        email,
        password,
        confirmPassword,
      }
    }
    else {
      data = {
        email,
        password,
      };
      console.log("IM RIGHT HERE", data);
    }

    axios.post(register ? "http://localhost:3002/api/auth/register" : "http://localhost:3002/api/auth/login", data)
      .then(() => {
        getCurrentUser();
      })
      .catch(err => {
        setLoading(false);
        //if these properties exist on error and if data exist on response then we are gonna set the errors to err.response.data.
        if (err?.response?.data) {
          setErrors(err.response.data);
        }
      });
  };

  return (
    <div className="auth">
      <div className="auth__boxy">
        <div className="auth__header">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>

        <form onSubmit={onSubmit}>
          {register && (
            <div className="auth__field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {errors.name && <p className="auth__error">{errors.name}</p>}
            </div>
          )}

          <div className="auth__field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && <p className="auth__error">{errors.email}</p>}
          </div>

          <div className="auth__field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && (
              <p className="auth__error">{errors.password}</p>
            )}
          </div>

          {register && (
            <div className="auth__field">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {errors.confirmPassword && (
                <p className="auth__error">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <div className="auth__footer">
            {Object.keys(errors).length > 0 && (
              <p className="auth__error">
                {register ? "You have some validation errors" : errors.error}
              </p>
            )}

            <button className="btn" type="submit" disabled={loading}>
              {register ? "Register" : "Login"}
            </button>

            {!register ? (
              <div className="auth__register">
                <p>
                  Not a member? <Link to="/register">Register now</Link>
                </p>
              </div>
            ) : (
              <div className="auth__register">
                <p>
                  Already a member? <Link to="/">Login now</Link>
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthBoxy;

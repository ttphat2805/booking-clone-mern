import React, { useState } from "react";
import { AuthState } from "../../context/AuthContext";
import { authServices } from "../../services";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  let { loading, error, dispatch, user } = AuthState();
  const onInputChange = (e) => {
    let { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      authServices.Login(credentials).then(
        (data) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
        },
        (err) => {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
      );
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message.data });
    }
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={onSubmitLogin}>
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            onChange={onInputChange}
            className="finput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={onInputChange}
            className="finput"
          />

          <button type="submit">Login</button>
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;

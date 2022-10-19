import "../../auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../reusables/InputField";

// makes a request to login the user
const fetchForm = async (username, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/login`,
    requestOptions
  );
  const resJson = await res.json();

  return resJson;
};

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All the fields are required");
      return;
    }
    const res = await fetchForm(username, password);

    if (res.token) {
      localStorage.setItem("secret_token", res.token);
      navigate("/");
      return;
    }

    setError("Username or password incorrect");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>LOGIN</h1>
        </div>
        <form>
          <InputField
            name="username"
            label="Username"
            value={username}
            setValue={setUsername}
            type="text"
          />
          <InputField
            name="password"
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          {error ? <p className="error">{error}</p> : null}
          <p>
            Don't have an account? Sign-up <a href="/signup">here</a>.
          </p>

          <div className="button-container">
            <button onClick={submit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

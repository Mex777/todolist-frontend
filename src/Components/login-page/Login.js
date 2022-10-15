import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotAuthenticated } from "../auth";

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
    const res = await fetchForm(username, password);

    if (res.token) {
      localStorage.setItem("secret_token", res.token);
      navigate("/");
      return;
    }

    setError("Username or password incorrect");
  };

  return (
    <div>
      <NotAuthenticated />
      <form>
        <label>Username</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={submit}>Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default Login;
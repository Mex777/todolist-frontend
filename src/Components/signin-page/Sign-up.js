import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotAuthenticated } from "../auth";

const fetchSignupForm = async (username, password) => {
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
    `${process.env.REACT_APP_API_URL}/signup`,
    requestOptions
  );
  const resJSON = await res.json();
  return resJSON;
};

function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!username || !password || !passwordRepeat) {
      setError("All fields are required");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Passwords must match");
      return;
    }

    const res = await fetchSignupForm(username, password);

    if (res.message) {
      navigate("/login");
      return;
    }

    setError("Username already taken");
  };

  return (
    <div className="container">
      <div className="card">
        <NotAuthenticated />
        <div className="card-header">
          <h1>Create an account</h1>
        </div>
        <form>
          <div className="field">
            <label>Username</label>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Repeat Password</label>
            <input
              name="repeat-password"
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
            />
          </div>
          {error ? <p className="error">{error}</p> : null}
          <p>
            Already have an account? Login <a href="/login">here</a>
          </p>
          <div className="button-container">
            <button onClick={submit}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

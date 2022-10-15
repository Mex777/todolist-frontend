import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotAuthenticated } from "../auth";

const fetchForm = async (username, password) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  var requestOptions = {
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

    const res = await fetchForm(username, password);

    if (res.message) {
      navigate("/login");
      return;
    }

    setError("Username already taken");
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
        <label>Repeat Password</label>
        <input
          name="password"
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          required
        />
        <button onClick={submit}>Submit</button>
      </form>
      <p>{error}</p>
      <p>
        Already have an account? Login <a href="/login">here</a>
      </p>
    </div>
  );
}

export default SignUp;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchUser = async () => {
  const token = localStorage.getItem("secret_token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const res = await fetch(process.env.REACT_APP_API_URL, requestOptions);
    const resJSON = await res.json();
    return resJSON;
  } catch (err) {
    return 0;
  }
};

function IsAuthenticated() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userJSON = await fetchUser();
      if (!userJSON.user) navigate("/login");
      setUser(userJSON.user);
    })();
  }, [setUser]);

  return null;
}

function NotAuthenticated() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userJSON = await fetchUser();
      if (userJSON.user) navigate("/");
      setUser(userJSON.user);
    })();
  }, []);

  return null;
}

export { IsAuthenticated, NotAuthenticated };

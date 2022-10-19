import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// makes a request to see if the user is logged in or not
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

// middleware component which returns a component only if the user is logged in
function IsAuthenticated({ Component }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userJSON = await fetchUser();
      if (!userJSON.user) navigate("/login");
      setUser(userJSON.user);
    })();
  }, [navigate, setUser]);

  if (user) return <Component user={user} />;
}

// middleware comoponent which returns a component only if the user is not logged in
function NotAuthenticated({ Component }) {
  const navigate = useNavigate();
  const [notLogged, setNotLogged] = useState(false);
  useEffect(() => {
    (async () => {
      const userJSON = await fetchUser();
      if (userJSON.user) navigate("/");
      setNotLogged(true);
    })();
  });

  if (notLogged) return <Component />;
}

export { IsAuthenticated, NotAuthenticated };

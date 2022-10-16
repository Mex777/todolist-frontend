import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, IsAuthenticated } from "../auth";
import LogoutBtn from "../reusables/LogoutBtn";
import Lists from "./Lists";
import Main from "./Main";

const fetchList = async (todoid) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const list = await fetch(
      `${process.env.REACT_APP_API_URL}/todo/${todoid}`,
      requestOptions
    );
    const listJSON = await list.json();
    return listJSON;
  } catch (err) {
    console.log("err:", err);
  }

  return 0;
};

const fetchTasks = async () => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const items = await fetch(
    `${process.env.REACT_APP_API_URL}/items`,
    requestOptions
  );
  const itemsJSON = await items.json();
  return itemsJSON;
};

function App() {
  const [mainList, setMainList] = useState(0);
  const [allTasks, setAllTasks] = useState();
  const [title, setTitle] = useState("All Tasks");

  const changeMain = (id, name) => {
    setTitle(name);
    if (id) setMainList(allTasks.filter((task) => task.partOf == id));
    else setMainList(allTasks);
  };

  useEffect(() => {
    (async () => {
      const tasks = await fetchTasks();
      setAllTasks(tasks);
      setMainList(tasks);
    })();
  }, []);

  return (
    <div>
      <IsAuthenticated />
      <LogoutBtn name={"Sign out"} />
      <Lists change={changeMain}></Lists>
      <Main listName={title} tasks={mainList} />
    </div>
  );
}

export default App;

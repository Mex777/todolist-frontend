import "../../app.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, IsAuthenticated } from "../auth";
import LogoutBtn from "../reusables/LogoutBtn";
import Lists from "./Lists";
import Main from "./Main";

const fetchLists = async () => {
  const token = localStorage.getItem("secret_token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/todo`,
    requestOptions
  );
  const resJSON = await res.json();
  return resJSON;
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

const addItemReq = async (name, id, description) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  let res;
  if (id === "none") {
    res = await fetch(
      `${process.env.REACT_APP_API_URL}/items?name=${name}&description=${description}`,
      requestOptions
    );
  } else {
    res = await fetch(
      `${process.env.REACT_APP_API_URL}/items?name=${name}&description=${description}&partOf=${id}`,
      requestOptions
    );
  }

  const resJSON = await res.json();

  return resJSON;
};

const fetchDeleteTask = async (id) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`, requestOptions);
};

const fetchNewList = async (name) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const newList = await fetch(
    `${process.env.REACT_APP_API_URL}/todo?name=${name}`,
    requestOptions
  );
  const newListJSON = await newList.json();
  return newListJSON;
};

const fetchDeleteList = async (id) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${process.env.REACT_APP_API_URL}/todo/${id}`, requestOptions);
};

function App() {
  const [mainList, setMainList] = useState(0);
  const [allTasks, setAllTasks] = useState();
  const [title, setTitle] = useState("All tasks");
  const [lists, setLists] = useState();

  const changeMain = (id, name) => {
    setTitle(name);
    if (id) setMainList(allTasks.filter((task) => task.partOf == id));
    else setMainList(allTasks);
  };

  const delTask = (id) => {
    fetchDeleteTask(id);
    setAllTasks(allTasks.filter((task) => task._id != id));
    setMainList(mainList.filter((task) => task._id != id));
  };

  const addTask = async (name, id, description) => {
    const task = await addItemReq(name, id, description);
    setAllTasks(allTasks.concat([task]));
    const listName = lists.find((el) => el._id == id);
    if (title === "All tasks" || title === listName.name)
      setMainList(mainList.concat([task]));
  };

  const addList = async (name) => {
    const list = await fetchNewList(name);
    setLists(lists.concat([list]));
  };

  const delList = (name) => {
    const list = lists.find((el) => el.name === name);
    fetchDeleteList(list._id);

    // to do: make this work without reloading the page
    // setMainList(
    //   mainList.filter((task) => {
    //     return task.partOf !== list._id;
    //   })
    // );
    // const filtered = allTasks.filter((task) => {
    //   console.log(task.partOf, list._id, task.partOf !== list._id);
    //   return task.partOf !== list._id;
    // });
    // setAllTasks(filtered);
    // changeMain(0, "All tasks");
    // setLists(lists.filter((el) => el._id !== list._id));
    // console.log(filtered);

    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      const tasks = await fetchTasks();
      const lists = await fetchLists();
      setLists(lists);
      setAllTasks(tasks);
      setMainList(tasks);
    })();
  }, []);

  return (
    <div className="main">
      <IsAuthenticated />
      <div className="header">
        <h1 className="title"> MEX's TO-DOs</h1>
        <LogoutBtn name={"Sign out"} />
      </div>
      <div className="main">
        <div className="cnt">
          <div className="sidebar">
            <Lists addList={addList} change={changeMain} lists={lists}></Lists>
          </div>
          <div className="list">
            <Main
              listName={title}
              tasks={mainList}
              delTask={delTask}
              allLists={lists}
              addTask={addTask}
              delList={delList}
            />
          </div>
        </div>
      </div>
      <div className="footer">Copyright © Mex 2022</div>
    </div>
  );
}

export default App;

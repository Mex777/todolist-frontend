import "../../app.css";
import { useEffect, useState } from "react";
import { IsAuthenticated } from "../auth";
import {
  fetchDeleteList,
  fetchDeleteTask,
  fetchLists,
  fetchNewList,
  fetchTasks,
  addItemReq,
} from "./req";
import LogoutBtn from "../reusables/LogoutBtn";
import Main from "./Main";
import Sidebar from "./sidebar/Sidebar";

function App({ user }) {
  const [mainList, setMainList] = useState(0);
  const [allTasks, setAllTasks] = useState();
  const [title, setTitle] = useState("All tasks");
  const [lists, setLists] = useState();

  const changeMain = (id, name) => {
    setTitle(name);
    if (id) setMainList(allTasks.filter((task) => task.partOf === id));
    else setMainList(allTasks);
  };

  const delTask = (id) => {
    fetchDeleteTask(id);
    setAllTasks(allTasks.filter((task) => task._id !== id));
    setMainList(mainList.filter((task) => task._id !== id));
  };

  const addTask = async (name, id, description) => {
    const task = await addItemReq(name, id, description);
    setAllTasks(allTasks.concat([task]));
    const listName = lists.find((el) => el._id === id);
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

    const filtered = allTasks.filter((task) => task.partOf !== list._id);
    changeMain(0, "All tasks");
    setAllTasks(filtered);
    setMainList(filtered);
    setLists(lists.filter((el) => el._id !== list._id));
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
      <div className="header">
        <h1 className="title unselectable"> {user.username}'s TO-DOs</h1>
        <LogoutBtn name={"Sign out"} />
      </div>
      <div className="main">
        <div className="grid">
          <Sidebar addList={addList} change={changeMain} lists={lists} />
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
      <div className="footer">Copyright © Mex 2022</div>
    </div>
  );
}

export default App;

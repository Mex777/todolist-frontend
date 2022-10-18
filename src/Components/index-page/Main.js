import { useState } from "react";
import { ReactComponent as TrashIcon } from "../../trash-icon.svg";
import Form from "./Add-task-form";
import MainHeader from "./Main-header";
import Task from "./Task-list";

function Main({ tasks, listName, delTask, allLists, addTask, delList }) {
  const [showAddTask, setShowAddTask] = useState(false);

  const toggle = () => {
    setShowAddTask(!showAddTask);
  };

  if (tasks)
    return (
      <div className="list">
        <div className="card todolist">
          <MainHeader listName={listName} delList={delList} toggle={toggle} />
          <ul className="task-list">
            {tasks.map((task) => (
              <Task key={task._id} task={task} delTask={delTask} />
            ))}

            {showAddTask ? (
              <Form allLists={allLists} addTask={addTask} close={toggle} />
            ) : null}
          </ul>
        </div>
      </div>
    );
}

export default Main;

import { useState } from "react";
import Form from "./form/Form";
import MainHeader from "./Main-header";
import Task from "./Task-list";

function Main({
  tasks,
  listName,
  delTask,
  allLists,
  addTask,
  delList,
  mainID,
}) {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggle = () => {
    setShowTaskForm(!showTaskForm);
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

            {showTaskForm ? (
              <Form
                allLists={allLists}
                addTask={addTask}
                close={toggle}
                mainID={mainID}
              />
            ) : null}
          </ul>
        </div>
      </div>
    );
}

export default Main;

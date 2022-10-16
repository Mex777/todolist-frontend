import { useState } from "react";

function Main({ tasks, listName, delTask, allLists, addTask }) {
  const [taskName, setTaskName] = useState("");
  const [list, setList] = useState("none");
  if (tasks)
    return (
      <div>
        <h2>{listName}</h2>
        {tasks.map((task) => {
          return (
            <li key={task._id}>
              {task.name}
              <button onClick={() => delTask(task._id)}>D </button>
            </li>
          );
        })}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask(taskName, list);
            setTaskName("");
          }}
        >
          <label>Task Name</label>
          <input
            name="name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <div>
            <label>Project</label>
            <select
              name="partOf"
              value={list}
              onChange={(e) => setList(e.target.value)}
            >
              <option value="none">None</option>
              {allLists.map((list) => {
                return (
                  <option key={list._id} value={list._id}>
                    {list.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    );
}

export default Main;

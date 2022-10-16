import { useState } from "react";
import { ReactComponent as TrashIcon } from "../../trash-icon.svg";
import { ReactComponent as AddIcon } from "../../plus-square-icon.svg";
import { ReactComponent as DeleteIcon } from "../../x-circle-icon.svg";

function Main({ tasks, listName, delTask, allLists, addTask, delList }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescripion] = useState("");
  const [list, setList] = useState("none");
  const [showAddTask, setShowAddTask] = useState(false);
  const [error, setError] = useState(false);
  if (tasks)
    return (
      <div className="card todolist">
        <div className="card-header">
          <h2>{listName}</h2>
          <div className="buttons">
            {listName !== "All tasks" ? (
              <button className="delete-list" onClick={() => delList(listName)}>
                <DeleteIcon />
              </button>
            ) : null}
            <button
              className="add-task"
              onClick={() => setShowAddTask(!showAddTask)}
            >
              <AddIcon />
            </button>
          </div>
        </div>
        <ul className="task-list">
          {tasks.map((task) => {
            return (
              <li className="task" key={task._id}>
                <div>
                  <h5 className="task-name">{task.name}</h5>
                  <p className="task-description">{task.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => delTask(task._id)}
                >
                  <TrashIcon />
                </button>
              </li>
            );
          })}

          {showAddTask ? (
            <li>
              <form>
                <div className="field">
                  <label>Task Name</label>
                  <input
                    name="name"
                    id="name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescripion(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Project</label>
                  <select
                    name="partOf"
                    id="part-of"
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
                {error ? <p className="error">{error}</p> : null}
                <div className="button-group">
                  <button
                    className="cancel-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setError("");
                      setShowAddTask(false);
                      setTaskDescripion("");
                      setTaskName("");
                    }}
                  >
                    Cancel
                  </button>
                  <div className="button-container">
                    <button
                      className="add-task-button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (taskName) {
                          addTask(taskName, list, taskDescription);
                          setTaskName("");
                          setTaskDescripion("");
                          setShowAddTask(false);
                          setError("");
                        } else setError("Name must not be empty");
                      }}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </form>
            </li>
          ) : null}
        </ul>
      </div>
    );
}

export default Main;

import { useState } from "react";

function Form({ allLists, addTask, close }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescripion] = useState("");
  const [selectedList, setSelectedList] = useState("none");
  const [error, setError] = useState("");

  return (
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
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
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
            type="button"
            onClick={() => close()}
          >
            Cancel
          </button>
          <div className="button-container">
            <button
              className="add-task-button"
              onClick={(e) => {
                e.preventDefault();
                if (taskName) {
                  addTask(taskName, selectedList, taskDescription);
                  close();
                } else setError("Name must not be empty");
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </li>
  );
}

export default Form;

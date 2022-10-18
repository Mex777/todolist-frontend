import { ReactComponent as TrashIcon } from "../../trash-icon.svg";

function Task({ task, delTask }) {
  return (
    <li className="task">
      <div>
        <h5 className="task-name">{task.name}</h5>
        <p className="task-description">{task.description}</p>
      </div>
      <button className="delete-button" onClick={() => delTask(task._id)}>
        <TrashIcon />
      </button>
    </li>
  );
}

export default Task;

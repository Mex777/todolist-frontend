import { ReactComponent as TrashIcon } from "../../trash-icon.svg";

const compare = (date) => {
  const currDate = new Date();
  return (
    // date.getDate() >= currDate.getDate() &&
    // date.getMonth() >= currDate.getMonth() &&
    // date.getFullYear() >= currDate.getFullYear()
    currDate <= date
  );
};

function Task({ task, delTask }) {
  let dateClass;
  const date = new Date(task.date);
  const formattedString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const valid = new Date() <= date;
  if (valid) dateClass = "valid";
  else dateClass = "expired";

  return (
    <li className="task">
      <div className="align">
        <div>
          <h5 className="task-name">{task.name}</h5>
          <p className="task-description">{task.description}</p>
        </div>
        <button className="delete-button" onClick={() => delTask(task._id)}>
          <TrashIcon />
        </button>
      </div>
      <p className={`task-date ${dateClass}`}>Due {formattedString}</p>
    </li>
  );
}

export default Task;

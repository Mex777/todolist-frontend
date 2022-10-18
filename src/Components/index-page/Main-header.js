import { ReactComponent as DeleteIcon } from "../../x-circle-icon.svg";
import { ReactComponent as AddIcon } from "../../plus-square-icon.svg";

function MainHeader({ listName, delList, toggle }) {
  return (
    <div className="card-header">
      <h2>{listName}</h2>
      <div className="buttons">
        {listName !== "All tasks" ? (
          <button className="delete-list" onClick={() => delList(listName)}>
            <DeleteIcon />
          </button>
        ) : null}
        <button className="add-task" onClick={() => toggle()}>
          <AddIcon />
        </button>
      </div>
    </div>
  );
}

export default MainHeader;

import { useState } from "react";

function Lists({ change, lists, addList }) {
  const [listName, setListName] = useState("");
  if (lists)
    return (
      <div>
        <form
          className="add-new-list"
          onSubmit={(e) => {
            e.preventDefault();
            const listWithSameName = lists.find(
              (list) => list.name === listName
            );
            if (!listWithSameName) {
              addList(listName);
              setListName("");
            }
          }}
        >
          <input
            className="add-new-list"
            placeholder="Add new list"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          ></input>
        </form>
        <ul className="task-list">
          <li className="task todo" onClick={() => change(0, "All tasks")}>
            All tasks
          </li>
          {lists.map((list) => (
            <li
              className="task todo"
              key={list._id}
              onClick={() => change(list._id, list.name)}
            >
              {list.name}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Lists;

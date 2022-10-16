import { useState } from "react";

function Lists({ change, lists, addList }) {
  const [listName, setListName] = useState("");
  if (lists)
    return (
      <div>
        <form
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
            placeholder="Add new list"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          ></input>
        </form>
        <li onClick={() => change(0, "All tasks")}>All tasks</li>
        {lists.map((list) => (
          <li key={list._id} onClick={() => change(list._id, list.name)}>
            {list.name} {list.description}
          </li>
        ))}
      </div>
    );
}

export default Lists;

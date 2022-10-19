import { useState } from "react";
import NewListForm from "./NewListForm";

function Sidebar({ change, lists, addList }) {
  if (lists)
    return (
      <div className="sidebar">
        <div>
          <NewListForm lists={lists} addList={addList} />
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
      </div>
    );
}

export default Sidebar;

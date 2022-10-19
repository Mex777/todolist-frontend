import { useState } from "react";

function NewListForm({ lists, addList }) {
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className="add-new-list"
      onSubmit={(e) => {
        e.preventDefault();
        const listWithSameName = lists.find((list) => list.name === listName);
        if (!listWithSameName) {
          addList(listName);
          setListName("");
          setError("");
        } else {
          setError("This list name already exists");
        }
      }}
    >
      <input
        className="add-new-list"
        placeholder="Add new list"
        value={listName}
        onChange={(e) => {
          setError("");
          setListName(e.target.value);
        }}
      ></input>
      {error ? <p className="error">{error}</p> : null}
    </form>
  );
}

export default NewListForm;

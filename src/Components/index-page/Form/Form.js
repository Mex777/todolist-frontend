import { useState } from "react";
import CancelButton from "./CancelButton";
import DescriptionInput from "./Description-input";
import ListSelector from "./ListSelector";
import NameInput from "./NameInput";
import SubmitButton from "./SubmitButton";

function Form({ allLists, addTask, close }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescripion] = useState("");
  const [selectedList, setSelectedList] = useState("none");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (taskName) {
      addTask(taskName, selectedList, taskDescription);
      close();
    } else setError("Name must not be empty");
  };

  return (
    <li>
      <form>
        <NameInput taskName={taskName} setTaskName={setTaskName} />
        <DescriptionInput
          taskDescription={taskDescription}
          setTaskDescripion={setTaskDescripion}
        />
        <ListSelector
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          allLists={allLists}
        />

        {error ? <p className="error">{error}</p> : null}
        <div className="button-group">
          <CancelButton close={close} />
          <SubmitButton submit={submit} />
        </div>
      </form>
    </li>
  );
}

export default Form;

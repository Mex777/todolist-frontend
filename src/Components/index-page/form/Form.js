import { useState } from "react";
import InputField from "../../reusables/InputField";
import CancelButton from "./CancelButton";
import DateInput from "./DateInput";
import DescriptionInput from "./Description-input";
import ListSelector from "./ListSelector";
import SubmitButton from "./SubmitButton";

function Form({ allLists, addTask, close, mainID }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescripion] = useState("");
  const [selectedList, setSelectedList] = useState(mainID);
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());

  const submit = (e) => {
    e.preventDefault();
    if (taskName) {
      addTask(taskName, selectedList, taskDescription, date);
      close();
    } else setError("Name must not be empty");
  };

  return (
    <li>
      <form>
        <InputField
          name="name"
          label="Task Name"
          value={taskName}
          setValue={setTaskName}
          type="text"
        />
        <DescriptionInput
          taskDescription={taskDescription}
          setTaskDescripion={setTaskDescripion}
        />
        {mainID === "none" ? (
          <ListSelector
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            allLists={allLists}
          />
        ) : null}
        <DateInput date={date} setDate={setDate} />
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

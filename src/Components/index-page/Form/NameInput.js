function NameInput({ taskName, setTaskName }) {
  return (
    <div className="field">
      <label>Task Name</label>
      <input
        name="name"
        id="name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
    </div>
  );
}

export default NameInput;

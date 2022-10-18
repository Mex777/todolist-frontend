function DescriptionInput({ taskDescription, setTaskDescripion }) {
  return (
    <div className="field">
      <label>Description</label>
      <textarea
        name="description"
        id="description"
        value={taskDescription}
        onChange={(e) => setTaskDescripion(e.target.value)}
      />
    </div>
  );
}

export default DescriptionInput;

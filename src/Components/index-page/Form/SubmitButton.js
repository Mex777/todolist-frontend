function SubmitButton({ submit }) {
  return (
    <div className="button-container">
      <button className="add-task-button" onClick={submit}>
        Add Task
      </button>
    </div>
  );
}

export default SubmitButton;

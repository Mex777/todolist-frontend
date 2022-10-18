function CancelButton({ close }) {
  return (
    <button className="cancel-button" type="button" onClick={() => close()}>
      Cancel
    </button>
  );
}

export default CancelButton;

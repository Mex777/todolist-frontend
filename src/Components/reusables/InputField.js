function InputField({ value, setValue, name, label, type }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        name={name}
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
}

export default InputField;

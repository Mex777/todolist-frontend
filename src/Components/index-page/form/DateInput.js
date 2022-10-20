import DatePicker from "react-date-picker";

function DateInput({ date, setDate }) {
  return (
    <div className="field">
      <label>Due to</label>
      <DatePicker
        wrapperClassName="field"
        label="Due to:"
        onChange={setDate}
        value={date}
        minDate={new Date()}
        clearIcon={null}
        format="dd/MM/yyyy"
      />
    </div>
  );
}
export default DateInput;

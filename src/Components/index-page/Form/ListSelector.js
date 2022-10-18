function ListSelector({ selectedList, setSelectedList, allLists }) {
  return (
    <div className="field">
      <label>Project</label>
      <select
        name="partOf"
        id="part-of"
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
      >
        <option value="none">None</option>
        {allLists.map((list) => {
          return (
            <option key={list._id} value={list._id}>
              {list.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ListSelector;

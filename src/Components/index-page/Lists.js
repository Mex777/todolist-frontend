function Lists({ change, lists }) {
  if (lists)
    return (
      <div>
        <li onClick={() => change(0, "All tasks")}>All tasks</li>
        {lists.map((list) => (
          <li key={list._id} onClick={() => change(list._id, list.name)}>
            {list.name} {list.description}
          </li>
        ))}
      </div>
    );
}

export default Lists;

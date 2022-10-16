function Main({ tasks, listName }) {
  if (tasks)
    return (
      <div>
        <h2>{listName}</h2>
        {tasks.map((task) => {
          return (
            <li key={task._id} id={task._id}>
              {task.name}
            </li>
          );
        })}
      </div>
    );
}

export default Main;

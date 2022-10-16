import { useEffect, useState } from "react";

const fetchLists = async () => {
  const token = localStorage.getItem("secret_token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/todo`,
    requestOptions
  );
  const resJSON = await res.json();
  return resJSON;
};

function Lists({ change }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const lists = await fetchLists();
      setList(lists);
    })();
  }, []);

  return (
    <div>
      <li onClick={() => change(0, "All tasks")}>All tasks</li>
      {list.map((el) => (
        <li key={el._id} onClick={() => change(el._id, el.name)}>
          {el.name} {el.description}
        </li>
      ))}
    </div>
  );
}

export default Lists;

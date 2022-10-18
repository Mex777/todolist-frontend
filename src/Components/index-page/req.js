const URL = process.env.REACT_APP_API_URL;

const fetchLists = async () => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(`${URL}/todo`, requestOptions);
  const resJSON = await res.json();
  return resJSON;
};

const fetchTasks = async () => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const items = await fetch(`${URL}/items`, requestOptions);
  const itemsJSON = await items.json();
  return itemsJSON;
};

const addItemReq = async (name, id, description) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };
  let res;
  if (id === "none") {
    res = await fetch(
      `${URL}/items?name=${name}&description=${description}`,
      requestOptions
    );
  } else {
    res = await fetch(
      `${URL}/items?name=${name}&description=${description}&partOf=${id}`,
      requestOptions
    );
  }

  const resJSON = await res.json();

  return resJSON;
};

const fetchDeleteTask = async (id) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${URL}/items/${id}`, requestOptions);
};

const fetchNewList = async (name) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const newList = await fetch(`${URL}/todo?name=${name}`, requestOptions);
  const newListJSON = await newList.json();
  return newListJSON;
};

const fetchDeleteList = async (id) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem("secret_token");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${URL}/todo/${id}`, requestOptions);
};

export {
  fetchDeleteList,
  fetchDeleteTask,
  fetchLists,
  fetchNewList,
  fetchTasks,
  addItemReq,
};

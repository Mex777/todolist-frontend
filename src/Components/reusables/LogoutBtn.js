function LogoutBtn({ name }) {
  const logout = () => {
    localStorage.setItem("secret_token", "");
    window.location.reload();
  };
  return <button onClick={logout}>{name}</button>;
}

export default LogoutBtn;

import { ReactComponent as LogoutIcon } from "../../logout-icon.svg";

function LogoutBtn({ name }) {
  const logout = () => {
    localStorage.setItem("secret_token", "");
    window.location.reload();
  };
  return (
    <button className="logout-btn" onClick={logout}>
      <LogoutIcon />
    </button>
  );
}

export default LogoutBtn;

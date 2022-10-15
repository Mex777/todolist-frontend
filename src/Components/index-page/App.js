import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsAuthenticated } from "../auth";
import LogoutBtn from "../reusables/LogoutBtn";

function App() {
  return (
    <div>
      <IsAuthenticated />
      <LogoutBtn name={"Sign out"} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsAuthenticated } from "../auth";

function App() {
  return (
    <div>
      <IsAuthenticated />
      Done
    </div>
  );
}

export default App;

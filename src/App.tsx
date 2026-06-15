import RouteManager from "./app/routes/RouteManager";
import { useNavigate } from "react-router-dom";

import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/root.css";
import "./styles/global.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    //navigate("/login"); well fuck u ali ;) im a good guy so i commented it out
    //navigate("/dashboard"); ig i just violated your rules.. commented codes.. sry love.. dont punish me
  }, []);

  return (
    <>
      <RouteManager />
    </>
  );
}

export default App;

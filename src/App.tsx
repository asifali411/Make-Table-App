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
    navigate("/dashboard");
  }, []);

  return (
    <>
      <RouteManager />
    </>
  );
}

export default App;

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
    // the root of our application is not '/' but '/dashboard'
    // this is used to ensure proper rendering of breadcrumbs
    // hence when we open the app, we immediately redirect to '/dashboard'
    // IMPORTANT: '/' should'nt be reachable
    navigate("/dashboard");
  }, []);

  return (
    <>
      <RouteManager />
    </>
  );
}

export default App;

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";

// Placeholders
const Loading = () => <div>Loading</div>;
const Dashboard = () => <div>Dashboard</div>;

const RouteManager = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        <Route element={ <Navbar /> }>
          <Route path="/" element={ <Dashboard /> }></Route>
        </Route>

      </Routes>
    </Suspense>
  );
}

export default RouteManager;
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Placeholders
const Loading = () => <div>Loading</div>;

const RouteManager = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<></>}></Route>
      </Routes>
    </Suspense>
  );
}
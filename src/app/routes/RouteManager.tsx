import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";

const Classes = lazy(() => import("../../pages/Classes"));

// Placeholders
const Loading        = () => <div>LOADING</div>;
const Dashboard      = () => <div>DASHBOARD</div>;
const Subjects       = () => <div>SUBJECTS</div>;
const Teachers       = () => <div>TEACHERS</div>;
const Assignments    = () => <div>ASSIGNMENTS</div>;
const Settings       = () => <div>SETTINGS</div>;
const HelpAndSupport = () => <div>HELP AND SUPPORT</div>

const RouteManager = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/"            element={ <Loading />      }></Route>
          <Route path="/dashboard"   element={ <Dashboard />      }></Route>
          <Route path="/classes"     element={ <Classes />        }></Route>
          <Route path="/subjects"    element={ <Subjects />       }></Route>
          <Route path="/teachers"    element={ <Teachers />       }></Route>
          <Route path="/assignments" element={ <Assignments />    }></Route>
          <Route path="/settings"    element={ <Settings />       }></Route>
          <Route path="/help"        element={ <HelpAndSupport /> }></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RouteManager;
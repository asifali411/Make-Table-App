import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../shared/components/navbar/Navbar";

//Auths
const Login    = lazy(() => import("../../features/auth/pages/Login"));
const Register = lazy(() => import("../../features/auth/pages/Register"));

const Classes     = lazy(() => import("../../features/classes/pages/Classes"));
const Subjects    = lazy(() => import("../../features/subjects/pages/Subjects"));
const Teachers    = lazy(() => import("../../features/teachers/pages/Teachers"));
const Assignments = lazy(() => import("../../features/assignments/pages/Assignments"));

// Placeholders
const Loading        = () => <div>LOADING</div>;
const Dashboard      = () => <div>DASHBOARD</div>;
const Settings       = () => <div>SETTINGS</div>;
const HelpAndSupport = () => <div>HELP AND SUPPORT</div>;

const RouteManager = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Navbar />}>
          <Route path="/" element={<Loading />}></Route>
          <Route path="/dashboard"   element={<Dashboard />      }></Route>
          <Route path="/classes"     element={<Classes />        }></Route>
          <Route path="/subjects"    element={<Subjects />       }></Route>
          <Route path="/teachers"    element={<Teachers />       }></Route>
          <Route path="/assignments" element={<Assignments />    }></Route>
          <Route path="/settings"    element={<Settings />       }></Route>
          <Route path="/help"        element={<HelpAndSupport /> }></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouteManager;

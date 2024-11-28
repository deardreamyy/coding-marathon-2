import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage"; 
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem("isAuthenticated")) || false
  );

  const setAuthState = (authState) => {
    sessionStorage.setItem("isAuthenticated", JSON.stringify(authState));
    setIsAuthenticated(authState);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={ !isAuthenticated ? ( <SignUpPage setIsAuthenticated={setAuthState}/>) : (<Navigate to = '/' />)} />
        <Route path="/login" element={!isAuthenticated ? ( <LogInPage setIsAuthenticated={setAuthState} />) : (<Navigate to = '/' />)} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

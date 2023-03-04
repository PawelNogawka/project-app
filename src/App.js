import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import ProjectDetails from "./pages/project/ProjectDetails";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

import "./App.css";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {user && <Sidebar />}
        <Switch>
          <Route exact path="/">
            {!user && <Redirect to="/login" />}
            {user && <Dashboard />}
          </Route>
          <Route path="/login">
            {user && <Redirect to="/" />}
            {!user && <Login />}
          </Route>
          <Route path="/signup">
            {user && <Redirect to="/" />}
            {!user && <Signup />}
          </Route>
          <Route path="/create">
            {!user && <Redirect to="/login" />}
            {user && <Create />}
          </Route>
          <Route path="/projects/:id">
            {!user && <Redirect to="/login" />}
            {user && <ProjectDetails />}
          </Route>
        </Switch>
        {user && <OnlineUsers />}
      </BrowserRouter>
    </>
  );
}

export default App;

import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import Avatar from "./Avatar";

import classes from "./Sidebar.module.scss";

const Sidebar = () => {
  const { user } = useAuthContext();
  return (
    <section className={classes.sidebar}>
      <Avatar main src={user.photoURL} displayName={user.displayName} />
      <nav>
        <NavLink to="/create" activeClassName={classes.active}>
          create
        </NavLink>
        <NavLink to="/" exact activeClassName={classes.active}>
          dashboard
        </NavLink>
      </nav>
    </section>
  );
};

export default Sidebar;

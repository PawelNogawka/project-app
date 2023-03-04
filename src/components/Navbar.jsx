import React from "react";

import { Link } from "react-router-dom";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import Wrapper from "../components/ui/Wrapper";
import Button from "../components/ui/Button";

import classes from "./Navbar.module.scss";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout, isLoading } = useLogout();
  return (
    <header>
      <Wrapper wide>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link className={classes.logo} to="/">
                logo
              </Link>
            </li>
            <div className={classes.menu}>
              {!user && (
                <>
                  <li>
                    <Link to="/login">login</Link>
                  </li>
                  <li>
                    <Link to="/signup">signup</Link>
                  </li>
                </>
              )}

              {user && (
                <li>
                  <Link to="/signup">
                    <Button
                      disabled={isLoading ? true : false}
                      outlined
                      text={isLoading ? "loading..." : "logout"}
                      onClick={logout}
                    />
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </Wrapper>
    </header>
  );
};

export default Navbar;

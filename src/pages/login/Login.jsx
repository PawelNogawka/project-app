import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import classes from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="section">
      <h1 className="page-heading">Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="email"
          required
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          label="password"
          required
        />
        <div className={classes.btns}>
          <Button
            submit
            disabled={isLoading ? true : false}
            text={isLoading ? "loading..." : "login"}
          />
          <Link to="/signup">
            <Button outlined text="dont have an account? Sign up" />
          </Link>
        </div>
        {error && <p className={classes.error}>{error}</p>}
      </form>
    </section>
  );
};

export default Login;

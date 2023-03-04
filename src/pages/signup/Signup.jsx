import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useSignup } from "../../hooks/useSignup";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import classes from "./Signup.module.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState(null);

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, photo);
  };

  const handleFileInputChange = (e) => {
    setPhoto(null);
    const photo = e.target.files[0];

    if (!photo) {
      setPhotoError("please select a photo");
      return;
    }

    if (!photo.type.includes("image")) {
      setPhotoError("photo must be an image");
      return;
    }

    if (photo.size > 100000) {
      setPhotoError("photo is too big");

      return;
    }

    setPhotoError(null);
    setPhoto(photo);
  };

  return (
    <section className="section">
      <h1 className="page-heading">signup</h1>
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
        <Input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          label="displayName"
          required
        />
        <Input
          type="file"
          label="photo"
          onChange={handleFileInputChange}
          required
          error={photoError}
        />

        <div className={classes.btns}>
          <Button
            submit
            disabled={isLoading ? true : false}
            text={isLoading ? "loading..." : "sign in"}
          />
          <Link to="/login">
            <Button outlined text="have an account? Login" />
          </Link>
        </div>
        {error && <p className={classes.error}>{error}</p>}
      </form>
    </section>
  );
};

export default Signup;

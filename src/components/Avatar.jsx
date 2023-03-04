import React from "react";

import classes from "./Avatar.module.scss";

const Avatar = ({ small, main, src, displayName }) => {
  return (
    <div className={classes.avatar}>
      <img
        className={small ? classes.small : null}
        src={src}
        alt={displayName}
      />
      {main && <p>Hello, {displayName}</p>}
    </div>
  );
};

export default Avatar;

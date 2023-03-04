import React from "react";

import { useCollection } from "../hooks/useCollection";

import Avatar from "./Avatar";

import classes from "./OnlineUsers.module.scss";

const OnlineUsers = () => {
  const { documents, error } = useCollection("users");

  return (
    <aside className={classes.users}>
      <h2>users</h2>
      {error && <p className={classes.error}>{error}</p>}
      <ul>
        {documents &&
          documents.map((user) => (
            <li key={user.id}>
              <Avatar small src={user.photoUrl} />
              <div className={classes["box"]}>
                {user.online && <span className={classes.online}>online</span>}
                {!user.online && (
                  <span className={classes.offline}>offline</span>
                )}
                <span className={classes.name}>{user.displayName}</span>
              </div>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default OnlineUsers;

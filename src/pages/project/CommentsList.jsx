import React from "react";

import Avatar from "../../components/Avatar";

import classes from "./CommentsList.module.scss";

const CommentsList = ({ project }) => {
  return (
    <div className={classes.comments}>
      <h2>Comments</h2>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className={classes.author}>
                <Avatar small src={comment.photoURL} />
                <p className={classes.name}>{comment.displayName}</p>
              </div>
              <p className={classes.created}>
                Created at {comment.createdAt.toDate().toDateString()}
              </p>
              <p className={classes.content}>{comment.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentsList;

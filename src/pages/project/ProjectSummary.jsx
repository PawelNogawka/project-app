import React from "react";
import { useHistory } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import Avatar from "../../components/Avatar";
import Button from "../../components/ui/Button";

import classes from "./ProjectSummary.module.scss";

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("projects");
  const history = useHistory();
  const handleClick = (e) => {
    deleteDocument(project.id);
    history.push("/");
  };

  return (
    <div className={classes.project}>
      <h1 className="page-heading">{project.name}</h1>
      <div className={classes.author}>
        <h2>{JSON.parse(project.createdBy).name}</h2>
        <Avatar src={JSON.parse(project.createdBy).photoURL} />
        <p className={classes["due-date"]}>
          due by {project.dueDate.toDate().toDateString()}
        </p>
      </div>
      <h2>Description:</h2>
      <p className={classes.description}>{project.details}</p>

      <h2>Assigned users:</h2>
      <div className={classes["assigned-users"]}>
        {JSON.parse(project.assignedUsers).map((user) => (
          <div className={classes.user}>
            <Avatar small src={user.value.photoUrl} />
            <h3 className={classes["user-name"]}>{user.value.displayName}</h3>
            {user.value.online ? (
              <span className={classes.online}>online</span>
            ) : (
              <span className={classes.offline}>offline</span>
            )}
          </div>
        ))}
      </div>
      {user.uid === JSON.parse(project.createdBy).id && (
        <Button onClick={handleClick} text="mark as done" />
      )}
    </div>
  );
};

export default ProjectSummary;

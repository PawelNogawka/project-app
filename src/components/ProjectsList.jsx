import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Avatar from "../components/Avatar";

import classes from "./ProjectsList.module.scss";

const ProjectsList = ({ projects }) => {
  return (
    <div className={classes.projects}>
      {projects.length === 0 && (
        <p className={classes["no-projects"]}>no projects here</p>
      )}
      {projects.map((project) => (
        <div className={classes.project}>
          <h3 className={classes.name}>{project.name}</h3>
          <p className={classes.author}>{JSON.parse(project.createdBy).name}</p>
          <p className={classes["due-date"]}>
            due by {project.dueDate.toDate().toDateString()}
          </p>
          <p className={classes.description}>
            {project.details.slice(0, 40) + "..."}
          </p>
          <div className={classes["assigned-users"]}>
            {JSON.parse(project.assignedUsers).map((user) => (
              <Avatar small src={user.value.photoUrl} />
            ))}
          </div>
          <Link to={`/projects/${project.id}`}>
            <Button text="read more" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;

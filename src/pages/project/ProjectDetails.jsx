import React from "react";
import { useParams } from "react-router-dom";

import { useDocument } from "../../hooks/useDocument";

import ProjectSummary from "./ProjectSummary";
import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";

import Loader from "../../components/ui/Loader";

import classes from "./ProjectDetails.module.scss";

const ProjectDetails = () => {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);


  if (!document) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <section className={classes.project}>
      <>
        <ProjectSummary project={document} />
        <CommentsList project={document} />
        <CommentsForm project={document} />
      </>
    </section>
  );
};

export default ProjectDetails;

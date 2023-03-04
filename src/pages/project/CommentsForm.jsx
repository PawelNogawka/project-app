import React, { useState } from "react";

import { useFirestore } from "../../hooks/useFirestore";
import { timestamp } from "../../firestore/config";
import { useAuthContext } from "../../hooks/useAuthContext";

import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";

import classes from "./CommentsForm.module.scss";

const CommentsForm = ({ project }) => {
  const [comment, setComment] = useState("");

  const { updateDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: comment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, newComment],
    });

    if (!response.error) {
      setComment("");
    }
  };

  return (
    <section className={classes.comments}>
      <form onSubmit={handleFormSubmit}>
        <TextArea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          label="add a comment"
        />
        <Button submit text={response.isPending ? "loading..." : "add"} />
      </form>
    </section>
  );
};

export default CommentsForm;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firestore/config";

import Select from "react-select";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";

import classes from "./Create.module.scss";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
];

const Create = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);

  const history = useHistory();

  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const { addDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please select assigned users");
      return;
    }

    const createdBy = {
      name: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(date)),
      category: category.value,
      comments: [],
      createdBy: JSON.stringify(createdBy),
      assignedUsers: JSON.stringify(assignedUsers),
    };

    await addDocument(project);

    if (!response.error) {
      history.push("/");
    }
  };

  const handleClearButtonClick = () => {
    setName("");
    setDetails("");
    setDate("");
    setCategory("");
    setFormError(null);
    setAssignedUsers([]);
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <section className={classes.create}>
      <h1 className="page-heading">create project</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          type="text"
          label="project name:"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          type="text"
          label="project details:"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <Input
          type="date"
          label="set due date:"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>
          <span className={classes["select-name"]}>select categories</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span className={classes["select-name"]}>select assigned users</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        {formError && <p className={classes.error}>{formError}</p>}
        <div className={classes.btns}>
          <Button submit text="create project" />
          <Button outlined text="clear" onClick={handleClearButtonClick} />
        </div>
      </form>
    </section>
  );
};

export default Create;

import React, { useState } from "react";

import { useCollection } from "../../hooks/useCollection";

import classes from "./Dashboard.module.scss";

import ProjectsList from "../../components/ProjectsList";
import Loader from "../../components/ui/Loader";
import ProjectFilter from "./ProjectFilter";

const Dashboard = () => {
  const [filterValue, setFilterValue] = useState("all");

  const { documents, error } = useCollection("projects");

  const projects = documents
    ? documents.filter((el) => {
        switch (filterValue) {
          case "all":
            return true;
          case "development":
          case "design":
          case "finance":
          case "education":
            case "marketing":
          case "healthcare":
            return el.category === filterValue;
        }
      })
    : null;


  if (!documents) return <Loader />;

  return (
    <section className={classes.dashboard}>
      <h1 className="page-heading">projects</h1>

      {error && <div className="error">{error}</div>}
      {
        <ProjectFilter
          setFilterValue={setFilterValue}
          filterValue={filterValue}
        />
      }
      {<ProjectsList projects={projects} />}
    </section>
  );
};

export default Dashboard;

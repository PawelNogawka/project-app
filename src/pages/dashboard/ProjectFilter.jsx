
import classes from "./ProjectFilter.module.scss";

const filters = [
  "all",
  "development",
  "design",
  "marketing",
  "finance",
  "education",
  "healthcare",
];

const ProjectFilter = ({ setFilterValue, filterValue }) => {
  const handleClick = (element) => {
    setFilterValue(element);
  };

  return (
    <div className={classes.filter}>
      <h3>Filter by:</h3>
      <div className={classes.btns}>
        {filters.map((element) => (
          <button
            className={`${classes.btn} ${
              element === filterValue && classes.active
            }`}
            onClick={() => handleClick(element)}
          >
            {element}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;

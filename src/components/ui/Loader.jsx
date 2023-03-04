import React from "react";


import { Grid } from  'react-loader-spinner'

import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.loader}>
      <Grid
        height="80"
        width="80"
        color="#f4695f"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;

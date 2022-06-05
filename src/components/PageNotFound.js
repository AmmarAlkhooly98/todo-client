import Grid from "@mui/material/Grid";

const PageNotFound = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <img
          alt="404 - page not found"
          width="50%"
          src="https://freesvg.org/img/1646582431404-error-404.png"
        />
      </Grid>
    </Grid>
  );
};

export default PageNotFound;

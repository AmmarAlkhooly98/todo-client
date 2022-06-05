import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "90%",
          height: 600,
          alignContent: "center",
          margin: "20px auto 0px auto",
        },
      }}
    >
      <Paper elevation={3}>
        <h1>Best todo app!</h1>
      </Paper>
    </Box>
  );
};

export default Home;

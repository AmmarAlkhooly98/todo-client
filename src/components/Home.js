import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "85%",
          alignContent: "center",
          margin: "20px auto 0px auto",
        },
      }}
    >
      <Paper elevation={3}>
        <h1>Best Simple Todo App!</h1>
        <div style={{ margin: "30px", textAlign: "left" }}>
          <Accordion
            style={{ padding: "7px" }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Stay in Sync
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                The ideal todo app should be effortless, simple, and actually
                save you time
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Todo apps should always be ready to quickly capture a random
                task. It shouldn’t require 16 steps to enter a todo. They should
                be quick to allow you to add a todo and get it “out of your
                head.”
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{ padding: "7px" }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Simple UI
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                easy to use
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Following on from quick capture, overall the app should be
                simple. Simple to use. Simple user interface. Too many features
                just clutter things up. And 99% of those extra bells and
                whistles never get used.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{ padding: "7px" }}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Today List
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                You can’t do it all
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                One of the best ways to “get work done” is to only concentrate
                on your top tasks for today. The ability to see a subset or “Hit
                List” for Today is important.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{ padding: "7px" }}
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Pretty Design
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                I bet you didn’t expect this one. But, yes, I am saying that the
                app has to be visually appealing. Sarcasm aside, this is basic
                UI design. The app has to look good and be readable, too.{" "}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Paper>
    </Box>
  );
};

export default Home;

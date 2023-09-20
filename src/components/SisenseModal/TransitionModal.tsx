import { useState } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MDButton from "components/MDButton";

import ExecuteQueryChart from "sisense/Charts/ExecuteQueryChart";
import DayOfWeek from "sisense/Charts/DayOfWeek";
import { ButtonGroup } from "components/ButtonGroup";
import DailySales from "sisense/Charts/DailySales";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const id = open ? "simple-popover" : undefined;

  const [view, setView] = useState("Views");
  return (
    <div>
      <MDButton
        variant="gradient"
        color="info"
        fullWidth
        aria-describedby={id}
        onClick={handleOpen}
      >
        Open modal
      </MDButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {view === "Views" && <DayOfWeek />}
            {view === "Sales" && <DailySales />}
            {view === "Discuss" && <DayOfWeek />}
            {view === "Act" && <DailySales />}
            <ButtonGroup
              selected={view}
              onChange={setView}
              labels={["Views", "Sales", "Discuss", "Act"]}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

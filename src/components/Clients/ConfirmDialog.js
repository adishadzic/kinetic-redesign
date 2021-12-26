import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
    top: 70,
  },
}));

function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={confirmDialog.isOpen}
        classes={{ paper: classes.dialog, root: classes.root }}
        TransitionComponent={Transition}
      >
        <DialogTitle style={{ fontFamily: "Montserrat, sans-serif" }}>
          <h4>
            Are you sure you want to delete{" "}
            <span style={{ backgroundColor: "rgba(110, 219, 214, 1)" }}>
              {confirmDialog.user}
            </span>{" "}
            from the database?
          </h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This cannot be undone</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmDialog({ ...confirmDialog, isOpen: false })
            }
          >
            No
          </Button>
          <Button onClick={confirmDialog.onConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;

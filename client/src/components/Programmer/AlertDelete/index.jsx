import { useDispatch } from "react-redux";
import moment from "moment-timezone";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { deleteRequirementRequest } from "../../../slices/requirement";

export default function AlertDelete({ date, open, setOpen }) {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    dispatch(deleteRequirementRequest({ date }));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="x1"
    >
      <DialogContent>
        <Typography variant="h6" component="h2">
          {`¿Estás seguro de eliminar el pedido del ${moment(date).format(
            "DD/MM/YYYY"
          )}?`}
        </Typography>
        <Typography variant="body1" component="p">
          Esta acción no se puede deshacer, y eliminará todos los datos <br />
          relacionados con este pedido.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleDelete}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

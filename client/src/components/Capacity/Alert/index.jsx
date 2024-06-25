import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { deleteCapacityRequest } from "../../../slices/capacity";
import { getSku } from "../../../selectors/capacity";

const Alert = ({ open, onClose, deleteProduct, setDeleteProduct }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => getSku(state, deleteProduct));

  const handleOnConfirm = () => {
    dispatch(deleteCapacityRequest({ idSku: product.id }));
    setDeleteProduct(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>¿Estás seguro que quieres eliminar el sku?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar <span className="font-semibold">{product?.sku}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOnConfirm} color="primary" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;

import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteProjectRequest } from "../../../../slices/projects";

export const ProjectAlert = ({ open, onClose, setProject, project }) => {
  const dispatch = useDispatch();

  const handleOnConfirm = () => {
    dispatch(deleteProjectRequest({ idProyecto: project.id }));
    setProject(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro que quieres eliminar la liga y el acceso al proyecto?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción no se puede deshacer. Por favor, confirma si estás seguro
          de eliminar <span className="font-semibold">{project?.c_nombre}</span>
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

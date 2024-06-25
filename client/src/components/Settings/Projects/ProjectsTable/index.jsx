import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";

const ProjectsTable = ({
  list,
  handleClickEditProject,
  handleDeleteProject,
  handleAddProject,
}) => {
  return (
    <Box sx={{ height: "calc(100vh - 135px)" }}>
      <Paper sx={{ width: "100%", height: "100%", mb: 2 }}>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Proyectos
          </Typography>
          <Tooltip title="Agregar proyecto">
            <IconButton onClick={() => handleAddProject()}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer sx={{ maxHeight: "calc(100% - 64px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* <TableCell><b>ID</b></TableCell> */}
                <TableCell>
                  <b>Icono</b>
                </TableCell>
                <TableCell>
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="center">
                  <b>Link</b>
                </TableCell>
                {/* <TableCell><b>Planta</b></TableCell>
                <TableCell><b>URL Proyecto</b></TableCell> */}
                <TableCell align="center">
                  <b>Acciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(list, (item) => (
                <TableRow key={item.id}>
                  {/* <TableCell>{item.idProyecto}</TableCell> */}
                  <TableCell>
                    <Avatar>
                      <Icon>{item?.c_icono}</Icon>
                    </Avatar>
                  </TableCell>
                  <TableCell>{item?.c_nombre}</TableCell>
                  <TableCell align="center">{item.c_link}</TableCell>
                  <TableCell width={140} align="center">
                    <Tooltip title="Editar">
                      <IconButton
                        aria-label="Editar"
                        onClick={() => handleClickEditProject(item)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        aria-label="Eliminar"
                        onClick={() => handleDeleteProject(item)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProjectsTable;

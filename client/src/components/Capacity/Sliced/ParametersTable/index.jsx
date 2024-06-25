import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import _ from "lodash";

import { StyledTableCell, StyledTableRow } from "../styledMui";

const ParametersTable = ({ data, handleEditClick, handleDeleteClick }) => {
  return (
    <TableContainer
      sx={{
        maxHeight: "calc(100% - 45px)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>SKU</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>Clasificación Familia</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Acomodo Barras por Cama</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>No. Racks por Carga</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Kg Barra</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Rendimiento</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Acciones</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.sku}</StyledTableCell>
              <StyledTableCell>{row.descripcion}</StyledTableCell>
              <StyledTableCell align="center">
                {row.acomodo_barras_cama}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.no_racks_carga}
              </StyledTableCell>
              <StyledTableCell align="center">{row.kg_barra}</StyledTableCell>
              <StyledTableCell align="center">
                {row.rendimiento}
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex items-center justify-end">
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParametersTable;

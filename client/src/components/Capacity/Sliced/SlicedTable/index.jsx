import { useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import _ from "lodash";

import { getParameters } from "../../../../selectors/parameters";
import { StyledTableCell, StyledTableRow, style } from "../styledMui";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import SlicedForm from "../SlicedForm";
import Alert from "../Alert";

const SlicedTable = ({
  params,
  setParams,
  selectedMachine,
  openParams,
  setOpenParams,
}) => {
  const parameters = useSelector(getParameters);
  const [openAlert, setOpenAlert] = useState(false);
  const handleEditClick = (row) => {
    setParams(row);
    setOpenParams(true);
  };
  const handleDeleteClick = (row) => {
    setParams(row);
    setOpenAlert(true);
  };
  return (
    <>
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
                <b>Ciclos por minuto</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Kg por paquete</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Paquetes por avance</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Acciones</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(parameters[selectedMachine], (row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.sku}</StyledTableCell>
                <StyledTableCell>{row.descripcion}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.ciclos_minutos}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.kg_paquete}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.paquetes_avance}
                </StyledTableCell>
                <StyledTableCell>
                  <div className="flex items-center justify-end">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(row)}
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
      <Modal open={openParams} onClose={() => setOpenParams(false)}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => setOpenParams(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <SlicedForm
            parameters={parameters[selectedMachine]}
            selectedMachine={selectedMachine}
            setOpenParams={setOpenParams}
            params={params}
            setParams={setParams}
          />
        </Box>
      </Modal>
      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        params={params}
        setParams={setParams}
      />
    </>
  );
};

export default SlicedTable;

import { useState, Fragment } from "react";
import _ from "lodash";
// import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
// import { useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
// import Button from "@mui/material/Button";

import GroupFilter from "../GroupFilter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.hover,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

const CapacityTable = ({
  setEditProduct,
  setOpenAlert,
  setOpenForm,
  selectedArr,
  setDeleteProduct,
  setSelectedArr,
  setShowSliced,
  showSliced,
  selectedLine,
  setSelectedLine,
}) => {
  //   const theme = useTheme();

  const [timings, setTimings] = useState(false);
  const [procesoIndex, setProcesoIndex] = useState(0);

  const handleAddClick = () => {
    setOpenForm(true);
    setEditProduct(null);
  };

  const handleEditClick = (index) => {
    setEditProduct(index);
    setOpenForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteProduct(index);
    setOpenAlert(true);
  };

  const handleNext = () => {
    if (procesoIndex < selectedArr[0].procesos.length - 8) {
      setProcesoIndex(procesoIndex + 1);
    }
  };

  const handleBack = () => {
    if (procesoIndex > 0) {
      setProcesoIndex(procesoIndex - 1);
    }
  };

  return (
    <Box sx={{ height: "calc(100vh - 80px)" }}>
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}>
        <div className="flex justify-between w-full">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Capacidad
          </Typography>
          <div className="ml-auto flex items-center">
            <GroupFilter
              selectedArr={selectedArr}
              setSelectedArr={setSelectedArr}
              setShowSliced={setShowSliced}
              showSliced={showSliced}
              selectedLine={selectedLine}
              setSelectedLine={setSelectedLine}
            />
            {timings && (
              <Fragment>
                <IconButton size="small" onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
                <IconButton size="small" onClick={handleNext}>
                  <ArrowForwardIcon />
                </IconButton>
              </Fragment>
            )}
            <Tooltip title="Mostrar tiempos">
              <IconButton sx={{ ml: 1 }} onClick={() => setTimings(!timings)}>
                <AccessTimeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Agregar sku">
              <IconButton onClick={handleAddClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <TableContainer
          sx={{
            maxHeight: "calc(100% - 45px)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {timings ? (
                  <Fragment>
                    <StyledTableCell>
                      <b>SKU</b>
                    </StyledTableCell>
                    {selectedArr &&
                      selectedArr[0]?.procesos &&
                      _.map(
                        _.slice(
                          selectedArr[0]?.procesos,
                          procesoIndex,
                          procesoIndex + 8
                        ),
                        (item) => (
                          <StyledTableCell key={item.nombre} align="center">
                            <b>{item.nombre}</b>
                          </StyledTableCell>
                        )
                      )}
                    <StyledTableCell align="right">
                      <b>Acciones</b>
                    </StyledTableCell>
                  </Fragment>
                ) : (
                  <>
                    <StyledTableCell>
                      <b>SKU</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>Clasificación Familia</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Lote (Kg)</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Rack</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>No. Rack</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tipo Emulsión</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tina Cárnico Fresco a Celda</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tina Emulsión a Celda</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tina Congelado a Tina Emulsión</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>Acciones</b>
                    </StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {timings ? (
                _.map(selectedArr, (row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.sku}</StyledTableCell>
                      {_.map(
                        _.slice(row?.procesos, procesoIndex, procesoIndex + 8),
                        (item) => (
                          <StyledTableCell key={item.nombre} align="center">
                            {item.data}
                          </StyledTableCell>
                        )
                      )}
                      <StyledTableCell align="right">
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
                  );
                })
              ) : (
                <>
                  {_.map(selectedArr, (row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.sku}</StyledTableCell>
                      <StyledTableCell>{row.descripcion}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.kg_lote}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.rack}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.no_rack}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tipo_emulsion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tinas_fresco}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tinas_emulsion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tinas_congelado}
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
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CapacityTable;

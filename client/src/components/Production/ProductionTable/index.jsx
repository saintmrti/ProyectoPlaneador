import { Fragment, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import _ from "lodash";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { changeKeySequence } from "./changeKeySequence";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.hover,
    fontWeight: "bold",
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

export default function ProductionTable({
  planProd,
  setPlanProd,
  editPlanProd,
  handleDeleteProd,
  setOriginalPlanProd,
}) {
  const [target, setTarget] = useState(0);
  const [editSec, setEditSec] = useState(null);
  const handleEditProd = (id) => {
    setEditSec(id);
  };
  const handleAcceptEdit = (index) => {
    if (target > 0 && target - 1 <= planProd.length && target - 1 < index) {
      const planProdOrdered = changeKeySequence(
        _.cloneDeep(planProd),
        editSec,
        target,
        index
      );
      const editPlanProd = _.map(planProdOrdered, (item, i) => ({
        ...item,
        sec: i + 1,
      }));
      setOriginalPlanProd(planProd);
      setPlanProd(editPlanProd);
    }
    setEditSec(null);
    setTarget(0);
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 213px)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                colSpan={planProd.length > 0 ? 8 : 7}
              >
                {editPlanProd ? "Editar Celda 2" : "Celda 2"}
              </StyledTableCell>
              {_.map(planProd[0]?.procesos, (proceso) => (
                <StyledTableCell
                  key={proceso.nombre}
                  sx={{ minWidth: 165 }}
                  align="center"
                  colSpan={2}
                >
                  {proceso.nombre}
                </StyledTableCell>
              ))}
            </TableRow>
            <TableRow>
              {planProd.length > 0 && (
                <StyledTableCell sx={{ width: "2rem", top: 57 }}>
                  <b>Acciones</b>
                </StyledTableCell>
              )}
              <StyledTableCell sx={{ width: ".5rem", top: 57 }}>
                <b>SEC</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57 }} align="center">
                <b>SKU</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57 }} align="center">
                <b>Destino</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57, minWidth: 100 }} align="center">
                <b>Lote (kg)</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57, minWidth: 95 }} align="center">
                <b>Rack</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57, minWidth: 100 }} align="center">
                <b># Racks</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57 }} align="center">
                <b>Tipo</b>
              </StyledTableCell>
              {_.map(planProd[0]?.procesos, (proceso) => (
                <Fragment key={proceso.nombre}>
                  <StyledTableCell sx={{ top: 57 }} align="center">
                    <b>Inicio</b>
                  </StyledTableCell>
                  <StyledTableCell sx={{ top: 57 }} align="center">
                    <b>Fin</b>
                  </StyledTableCell>
                </Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(planProd, (row, index) => (
              <StyledTableRow key={row.sec}>
                {planProd.length > 0 && (
                  <StyledTableCell align="center" component="th" scope="row">
                    <div className="flex justify-center items-center">
                      {/* {planProd[index]?.kanban === false && (
                        <Tooltip title="Eliminar">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteProd(row.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )} */}
                      <Tooltip title="Eliminar">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProd(row.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {editPlanProd && (
                        <>
                          {editSec && editSec === row.id ? (
                            <Tooltip title="Aceptar">
                              <IconButton
                                size="small"
                                onClick={() => handleAcceptEdit(index)}
                              >
                                <CheckIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Editar">
                              <IconButton
                                size="small"
                                onClick={() => handleEditProd(row.id)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </>
                      )}
                      {/* <Tooltip title="Ocultar">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleChangeActive(row.id, !row.activo)
                          }
                        >
                          {row.activo ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </Tooltip> */}
                    </div>
                  </StyledTableCell>
                )}
                {editPlanProd && editSec && editSec === row.id ? (
                  <StyledTableCell align="center">
                    <TextField
                      size="small"
                      type="number"
                      variant="standard"
                      defaultValue={row.sec}
                      onChange={(e) =>
                        e.target.value !== "" &&
                        setTarget(parseInt(e.target.value))
                      }
                    />
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">{row.sec}</StyledTableCell>
                )}
                <StyledTableCell align="center">{row.producto}</StyledTableCell>
                <StyledTableCell align="center">{row.destino}</StyledTableCell>
                <StyledTableCell align="center">{row.kg_lote}</StyledTableCell>
                <StyledTableCell align="center">{row.rack}</StyledTableCell>
                <StyledTableCell align="center">{row.no_rack}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.tipo_emulsion}
                </StyledTableCell>
                {_.map(row?.procesos, (proceso) => (
                  <Fragment key={proceso.nombre}>
                    <StyledTableCell align="center">
                      {proceso.inicio}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {proceso.fin}
                    </StyledTableCell>
                  </Fragment>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

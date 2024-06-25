import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import moment from "moment-timezone";
import _ from "lodash";

import GroupFilter from "../GroupFilter";
import DialogProduct from "../DialogProduct";
import SlicedDialog from "../Sliced/SlicedDialog";

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

const ProgrammerTable = ({
  list,
  setOpenDialog,
  openDialog,
  setRealPlan,
  realPlan,
  date,
  handleChangeDate,
  sliced,
  openDelete,
  setOpenDelete,
  ordersPlan,
  setClonPlan,
  products,
  kanban,
}) => {
  const today = moment(date).format("DD MMM");
  const yesterday = moment(date).subtract(1, "days").format("DD MMM");

  const theme = useTheme();
  const [plan, setPlan] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSliced, setOpenSliced] = useState(false);
  const [filteredPlan, setFilteredPlan] = useState([]);
  const [product, setProduct] = useState(null);

  const handleEditClick = (sku) => {
    setProduct(sku);
    sku?.linea === "Rebanados" ? setOpenSliced(true) : setOpen(true);
  };

  const handleClickProgramer = () => {
    setClonPlan(_.cloneDeep(realPlan));
    setOpenDialog(!openDialog);
  };

  const calculateInvFinal3 = (inv_final_1, prox_salida, pedido) => {
    const invFinal1 = inv_final_1 || 0;
    const proxSalida = prox_salida || 0;
    const pedidoValue = pedido || 0;
    return invFinal1 + pedidoValue - proxSalida;
  };

  const calculateDifInvFinal = (inv_final_1, prox_salida, tiendita, pedido) => {
    const tienda = tiendita || 0;
    const invFinal3 = calculateInvFinal3(inv_final_1, prox_salida, pedido);
    return invFinal3 - tienda;
  };

  useEffect(() => {
    const planData = _.map(list, (row) => {
      const productReal = _.find(realPlan, { idProducto: row?.idProducto });
      const pedido = productReal?.pedido || 0;
      const ajuste_carga = productReal?.ajuste_carga || 0;
      const destino = productReal?.destino || "";
      const ajuste_carga_extra = productReal?.ajuste_carga_extra || 0;
      const destino_doble = productReal?.destino_doble || "";
      const dividir = productReal?.dividir || false;
      return {
        ...row,
        ajuste_carga,
        pedido,
        destino,
        destino_doble,
        dividir,
        ajuste_carga_extra,
        min_kg_carga: products[row?.idProducto]?.min_kg_carga || 0,
        inv_final_3: calculateInvFinal3(
          row?.inv_final_1,
          row?.prox_salida,
          pedido
        ),
        dif_inv_final: calculateDifInvFinal(
          row?.inv_final_1,
          row?.prox_salida,
          row?.tiendita,
          pedido
        ),
      };
    });
    setPlan(planData);
  }, [list, sliced, realPlan, products, ordersPlan]);

  useEffect(() => {
    if (sliced?.length > 0 && kanban?.length > 0) {
      const order = [];
      _.map(sliced, (row) => {
        const productReal = _.find(kanban, { idSku: row.producto });
        if (row.ajuste_carga > 0) {
          order.push({
            idOrdenRebanado: productReal?.idOrdenRebanado,
            ordenes_iniciadas: productReal?.ordenes_iniciadas,
            idOrden: row.idOrden,
            idProducto: row.idProducto,
            sku: row.producto,
            ajuste_carga: row.ajuste_carga,
            pedido: row.pedido,
            dividir: row.dividir,
            destino: row.destino,
            destino_doble: row.destino_doble ? row.destino_doble : "",
            ajuste_carga_extra: row.ajuste_carga_extra
              ? row.ajuste_carga_extra
              : 0,
          });
        }
      });
      setRealPlan(order);
    } else {
      if (ordersPlan && ordersPlan.length > 0) {
        setRealPlan(ordersPlan);
      }
    }
  }, [sliced, ordersPlan, kanban]);

  return (
    <Box sx={{ height: "calc(100vh - 125px)" }}>
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}>
        <div className="flex justify-between w-full overflow-auto">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Programador
          </Typography>
          <div className="ml-auto flex items-center mt-1">
            <GroupFilter
              setFilteredPlan={setFilteredPlan}
              plan={plan}
              date={date}
              setRealPlan={setRealPlan}
              handleChangeDate={handleChangeDate}
            />
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => setOpenDelete(!openDelete)}
              disabled={list.length === 0}
            >
              Eliminar
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={handleClickProgramer}
              disabled={!plan.some((obj) => obj.ajuste_carga !== 0)}
            >
              Revisar
            </Button>
          </div>
        </div>
        <TableContainer
          sx={{
            maxHeight: "calc(100% - 45px)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  <b>SKU</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Plan Ajustado</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Minimo Kgs/Carga</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>BPT + CEDIS</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>WIP + Pgm {yesterday}</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Salida {yesterday}</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Inv Final 1</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Salida {today}</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Inv Final 2</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Tienda</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Programar</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Ajuste Cargas</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Pedido</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Inv Final 3</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Dif Inv Final</b>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(filteredPlan, (row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">
                    {row.producto}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.plan_ajustado}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.min_kg_carga}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.bpt_cedis}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.programa_hoy || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.salida_hoy}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.inv_final_1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.prox_salida}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.inv_final_2}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.tiendita}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.programar}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex justify-evenly items-center">
                      {row.ajuste_carga}
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.pedido}</StyledTableCell>
                  <StyledTableCell align="center">
                    {calculateInvFinal3(
                      row?.inv_final_1,
                      row?.prox_salida,
                      _.find(plan, { idProducto: row?.idProducto })?.pedido
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color:
                        calculateDifInvFinal(
                          row?.inv_final_1,
                          row?.prox_salida,
                          row?.tiendita,
                          _.find(plan, { idProducto: row?.idProducto })?.pedido
                        ) < 0
                          ? theme.palette.status.error
                          : theme.palette.status.success,
                    }}
                  >
                    {calculateDifInvFinal(
                      row?.inv_final_1,
                      row?.prox_salida,
                      row?.tiendita,
                      _.find(plan, { idProducto: row?.idProducto })?.pedido
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogProduct
          open={open}
          setOpen={setOpen}
          plan={plan}
          setPlan={setPlan}
          realPlan={realPlan}
          setRealPlan={setRealPlan}
          product={product}
          calculateInvFinal3={calculateInvFinal3}
          calculateDifInvFinal={calculateDifInvFinal}
        />
        <SlicedDialog
          open={openSliced}
          setOpen={setOpenSliced}
          plan={plan}
          setPlan={setPlan}
          realPlan={realPlan}
          setRealPlan={setRealPlan}
          product={product}
          calculateInvFinal3={calculateInvFinal3}
          calculateDifInvFinal={calculateDifInvFinal}
        />
      </Paper>
    </Box>
  );
};

export default ProgrammerTable;

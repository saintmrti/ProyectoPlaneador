import { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";

import { useSelector } from "react-redux";
import { getSlicedCapacity } from "../../../../../selectors/capacity";
import { getTimeParameters } from "../../../../../selectors/parameters";
import { calculatePedido } from "../../calculateSliced";
import { moveElement } from "./changeKeySequence";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TablaProgramador({
  realPlan,
  setDatosParaTablaRes,
  setRealPlan,
  selectBaler,
  setSlicedOrders,
  setDeleteOrders,
  date,
}) {
  const [data, setData] = useState([]);
  const [target, setTarget] = useState(0);
  const [orderReal, setOrderReal] = useState([]);
  const [editSec, setEditSec] = useState(null);
  const [totales, setTotales] = useState({
    totalLoteMinimo: 0,
    totalKgPlan: 0,
    totalKgAtemperado: 0,
    totalBarras: 0,
    totalParrillas: 0,
    totalKgHr: 0,
    totalHrUtilizada: 0,
    totalTiemposSTDdeProduccion: 0,
    totalTiempoDeCambio: 0,
    totalMinUtilizados: 0,
  });
  const temporalSliced = [];
  const capacity = useSelector(getSlicedCapacity);
  const dataProgram = useSelector(getTimeParameters);

  function obtenerKgHr(skuBuscado) {
    const tiemposRebanado = _.find(dataProgram, {
      nombre: selectBaler,
    })?.tiemposDeRebanado;
    if (skuBuscado && tiemposRebanado && tiemposRebanado.length > 0) {
      const resultado = _.filter(tiemposRebanado, { SKU: skuBuscado });
      return resultado.length > 0 ? resultado[0].KgPorHora : 0;
    } else {
      return 0;
    }
  }

  function obtenerTiempodeCambio(fila, columna) {
    const tiemposCambio = _.find(dataProgram, {
      nombre: selectBaler,
    })?.tiempoCambio;
    if (
      tiemposCambio &&
      Object.keys(tiemposCambio).length > 0 &&
      tiemposCambio[fila] &&
      tiemposCambio[fila][columna]
    ) {
      return tiemposCambio[fila][columna];
    } else {
      return 0;
    }
  }

  const handleChange = (e, id, ordenes_iniciadas) => {
    if (e.target.value !== "") {
      const newValue = parseInt(e.target.value);
      if (newValue >= ordenes_iniciadas || ordenes_iniciadas === undefined) {
        setRealPlan((prevPlan) => {
          const updatedArrayPlan = prevPlan.map((item) => {
            const sku = _.find(capacity, {
              sku: item.sku,
            });
            if (item.idProducto === id) {
              if (item.dividir === true) {
                if (selectBaler === "MVC 10") {
                  return {
                    ...item,
                    pedido: calculatePedido(newValue, sku),
                    ajuste_carga: newValue,
                  };
                }
                return {
                  ...item,
                  pedido: calculatePedido(newValue, sku),
                  ajuste_carga_extra: newValue,
                };
              }
              return {
                ...item,
                pedido: calculatePedido(newValue, sku),
                ajuste_carga: newValue,
              };
            }
            return item;
          });
          return updatedArrayPlan;
        });
      } else {
        alert(`No puedes disminuir el lote mínimo es ${ordenes_iniciadas}`);
      }
    }
  };

  const handleDelete = (order) => {
    if (order.idOrdenRebanado) {
      setDeleteOrders((prevOrders) => [...prevOrders, order.idOrdenRebanado]);
    }
    const updatedRealPlan = realPlan.filter(
      (row) => row.idProducto !== order.idProducto
    );
    setRealPlan(updatedRealPlan);
  };

  const handleEdit = (id) => {
    setEditSec(id);
  };

  const handleSave = (index, ordenes_iniciadas) => {
    if (editSec && target !== "") {
      if (
        target > 0 &&
        target - 1 <= realPlan.length &&
        target - 1 < index &&
        (ordenes_iniciadas <= 0 || ordenes_iniciadas === undefined)
      ) {
        const newArr = moveElement(realPlan, index, target - 1);
        setRealPlan(newArr);
      }
    }
    setEditSec(null);
    setTarget(0);
  };

  useEffect(() => {
    try {
      let sumaMinUtilizados = 0;
      setTotales({
        totalLoteMinimo: 0,
        totalKgPlan: 0,
        totalKgAtemperado: 0,
        totalBarras: 0,
        totalParrillas: 0,
        totalKgHr: 0,
        totalHrUtilizada: 0,
        totalTiemposSTDdeProduccion: 0,
        totalTiempoDeCambio: 0,
        totalMinUtilizados: 0,
      });
      const orderPlan = _.flatMap(realPlan, (item) => {
        if (item.dividir) {
          const sku = _.find(capacity, {
            sku: item.sku,
          });
          const objeto1 = {
            ajuste_carga: item.ajuste_carga,
            destino: item.destino,
            idProducto: item.idProducto,
            pedido: calculatePedido(item.ajuste_carga, sku),
            sku: item.sku,
          };
          const objeto2 = {
            ajuste_carga: item.ajuste_carga_extra,
            destino: item.destino_doble,
            idProducto: item.idProducto,
            pedido: calculatePedido(item.ajuste_carga_extra, sku),
            sku: item.sku,
          };
          return [objeto1, objeto2];
        } else {
          return {
            idOrdenRebanado: item.idOrdenRebanado,
            ordenes_iniciadas: item.ordenes_iniciadas,
            ajuste_carga: item.ajuste_carga,
            destino: item.destino,
            idProducto: item.idProducto,
            pedido: item.pedido,
            sku: item.sku,
          };
        }
      });
      if (!_.isEmpty(orderPlan)) {
        const filterByBaler = _.filter(orderPlan, (item) => {
          return item.destino === selectBaler;
        });
        const newData = _.map(filterByBaler, (obj, index, arr) => {
          const skuActual = obj["sku"];
          const skuCapacity = _.find(capacity, {
            sku: skuActual,
          });
          if (skuActual) {
            const loteMin = parseInt(obj["ajuste_carga"]);
            const skuAnterior = index > 0 ? arr[index - 1]["sku"] : "";
            const kgHr = obtenerKgHr(obj["sku"]);
            const hrUtilizada = kgHr === 0 ? 0 : obj["pedido"] / kgHr;
            const tiemSTDdeProduccion =
              obj["sku"] !== ""
                ? moment.duration(7, "minutes")
                : moment.duration(0, "minutes");
            const tiempoDeCambio =
              index === 0 ? 0 : obtenerTiempodeCambio(skuAnterior, skuActual);
            const minUtilizados = moment
              .duration(hrUtilizada, "hours")
              .add(tiempoDeCambio, "minutes")
              .add(tiemSTDdeProduccion, "minutes");
            const barras = Math.round(
              (obj["pedido"] /
                skuCapacity?.kg_barra /
                skuCapacity?.rendimiento) *
                100
            );
            const kgAtemperado = Math.round(barras * skuCapacity?.kg_barra);
            const barrasRack = skuCapacity?.acomodo_barras_cama * 9;
            const parrillas = barras / barrasRack;
            sumaMinUtilizados += minUtilizados.asMinutes();
            setTotales((prevTotales) => {
              return {
                ...prevTotales,
                totalLoteMinimo: prevTotales.totalLoteMinimo + loteMin,
                totalKgPlan: prevTotales.totalKgPlan + obj["pedido"],
                totalKgAtemperado: prevTotales.totalKgAtemperado + kgAtemperado,
                totalBarras: prevTotales.totalBarras + barras,
                totalParrillas: prevTotales.totalParrillas + parrillas,
                totalKgHr: prevTotales.totalKgHr + kgHr,
                totalHrUtilizada: prevTotales.totalHrUtilizada + hrUtilizada,
                totalTiemposSTDdeProduccion:
                  prevTotales.totalTiemposSTDdeProduccion +
                  tiemSTDdeProduccion.asMinutes(),
                totalTiempoDeCambio:
                  prevTotales.totalTiempoDeCambio + tiempoDeCambio,
                totalMinUtilizados: sumaMinUtilizados,
              };
            });
            return {
              ...obj,
              prioridad: index + 1,
              kg_hora: kgHr,
              hr_utilizada: parseFloat(hrUtilizada.toFixed(1)),
              tiempo_std: tiemSTDdeProduccion.asMinutes(),
              tiempo_cambio: tiempoDeCambio === 0 ? 0 : tiempoDeCambio,
              min_utilizados: parseFloat(minUtilizados.asMinutes().toFixed(1)),
              barras,
              kgAtemperado,
              parrillas: Math.round(parrillas),
              idMaquina: skuCapacity?.idMaquina,
            };
          } else {
            return obj;
          }
        });
        setData(newData);
        setOrderReal(orderPlan);
        setDatosParaTablaRes(sumaMinUtilizados);
      }
    } catch (e) {
      console.log("Error en Tabla Programador de DialogProgramV2", e);
    }
  }, [selectBaler, realPlan, dataProgram]);

  useEffect(() => {
    setSlicedOrders([]);
    if (selectBaler === "MVC 10") {
      const filteredByBaler = _.filter(orderReal, (item) => {
        return item.destino === "MVC 10";
      });
      _.forEach(filteredByBaler, (item, index) => {
        const skuData = _.find(data, { sku: item.sku });
        if (skuData) {
          let startTime, endTime;
          if (index === 0) {
            startTime = moment(`${date} 06:00:00`, "YYYY-MM-DD HH:mm:ss");
            endTime = moment(startTime)
              .add(skuData.hr_utilizada, "hours")
              .add(skuData.tiempo_std, "minutes")
              .add(30, "minutes");
          } else {
            const lastOrder = temporalSliced[temporalSliced.length - 1];
            startTime = moment(
              lastOrder?.f_fin_rebanado,
              "YYYY-MM-DD HH:mm:ss"
            ).add(skuData.tiempo_cambio, "minutes");
            endTime = moment(startTime)
              .add(skuData.hr_utilizada, "hours")
              .add(skuData.tiempo_std, "minutes");
            if (index === 1 || index === 2 || index === 3) {
              endTime = endTime.add(30, "minutes");
            }
          }
          const order = {
            idOrdenRebanado: item.idOrdenRebanado,
            ordenes_iniciadas: item.ordenes_iniciadas,
            idSku: item.sku,
            n_parrillas: skuData.parrillas,
            n_barras_total: skuData.barras,
            n_barras_parrilla: skuData.barras / skuData.parrillas,
            f_inicio_rebanado: startTime.format("YYYY-MM-DD HH:mm:ss"),
            f_fin_rebanado: endTime.format("YYYY-MM-DD HH:mm:ss"),
            idMaquina: skuData.idMaquina,
          };
          temporalSliced.push(order);
        }
      });
      setSlicedOrders(temporalSliced);
    }
  }, [data, orderReal]);
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflow: "auto",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        maxHeight: 300,
      }}
    >
      <Table sx={{ minWidth: 80 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {/* {(kanban?.length > 0 &&
              !kanban.every((item) => item?.kanban === true)) ||
            kanban.length === 0 ? (
              <StyledTableCell align="center">Acciones</StyledTableCell>
            ) : null} */}
            <StyledTableCell align="center">Acciones</StyledTableCell>
            <StyledTableCell align="center">Prioridad</StyledTableCell>
            <StyledTableCell>SKU</StyledTableCell>
            <StyledTableCell align="center">Lote Minimo</StyledTableCell>
            <StyledTableCell align="center">KG Plan</StyledTableCell>
            <StyledTableCell align="center">KG Atemperado</StyledTableCell>
            <StyledTableCell align="center"># Barras</StyledTableCell>
            <StyledTableCell align="center"># Parrillas</StyledTableCell>
            <StyledTableCell align="center">KG/HR</StyledTableCell>
            <StyledTableCell align="center">HR Utilizada</StyledTableCell>
            <StyledTableCell align="center">
              Tiempo STD <br /> de Producción
            </StyledTableCell>
            <StyledTableCell align="center">
              Tiempo de <br /> Cambio
            </StyledTableCell>
            <StyledTableCell align="center">
              Minutos <br /> Utilizados
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (row, index) => (
            <StyledTableRow key={row.idProducto}>
              {/* {(kanban?.length > 0 &&
                !kanban.every((item) => item?.kanban === true)) ||
              kanban.length === 0 ? (
                <StyledTableCell align="center">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(row.idProducto)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              ) : null} */}
              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(row)}
                  disabled={row?.ordenes_iniciadas > 0}
                >
                  <DeleteIcon />
                </IconButton>
                {editSec && row.idProducto === editSec ? (
                  <IconButton
                    aria-label="check"
                    size="small"
                    onClick={() => handleSave(index, row.ordenes_iniciadas)}
                  >
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => handleEdit(row.idProducto)}
                    disabled={row?.ordenes_iniciadas > 0}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {editSec && row.idProducto === editSec ? (
                  <Input
                    type="number"
                    defaultValue={row.prioridad}
                    onChange={(e) =>
                      e.target.value !== "" &&
                      setTarget(parseInt(e.target.value))
                    }
                    style={{ fontSize: "inherit", width: "40px" }}
                  />
                ) : (
                  row.prioridad
                )}
              </StyledTableCell>
              <StyledTableCell>{row.sku}</StyledTableCell>
              <StyledTableCell align="center">
                {!editSec ? (
                  <Input
                    type="number"
                    defaultValue={row.ajuste_carga}
                    // value={row.ajuste_carga}
                    onChange={(e) =>
                      handleChange(e, row.idProducto, row.ordenes_iniciadas)
                    }
                    inputProps={{
                      min: row.ordenes_iniciadas ? row.ordenes_iniciadas : 0,
                    }}
                    style={{ fontSize: "inherit", width: "50px" }}
                  />
                ) : (
                  row.ajuste_carga
                )}
              </StyledTableCell>
              <StyledTableCell align="center">{row.pedido}</StyledTableCell>
              <StyledTableCell align="center">
                {row.kgAtemperado}
              </StyledTableCell>
              <StyledTableCell align="center">{row.barras}</StyledTableCell>
              <StyledTableCell align="center">{row.parrillas}</StyledTableCell>
              <StyledTableCell align="center">{row.kg_hora}</StyledTableCell>
              <StyledTableCell align="center">
                {row.hr_utilizada}
              </StyledTableCell>
              <StyledTableCell align="center">{row.tiempo_std}</StyledTableCell>
              <StyledTableCell align="center">
                {row.tiempo_cambio}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.min_utilizados}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            {/* {(kanban?.length > 0 &&
              !kanban.every((item) => item?.kanban === true)) ||
            kanban.length === 0 ? (
              <StyledTableCell></StyledTableCell>
            ) : null} */}
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>
              <b>Totales</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalLoteMinimo}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalKgPlan}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalKgAtemperado}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalBarras}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{parseInt(totales.totalParrillas)}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalKgHr}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalHrUtilizada.toFixed(1)}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalTiemposSTDdeProduccion}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalTiempoDeCambio}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalMinUtilizados.toFixed(1)}</b>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

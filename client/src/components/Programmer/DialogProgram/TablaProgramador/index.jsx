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
import { styled } from "@mui/material/styles";

import {
  tiempoCambio_MVC10,
  tiempoCambio_ULMA2,
  tiempoCambio_MVC12,
} from "./data";

const dataProgram = [
  {
    nombre: "MVC 10",
    tiemposDeRebanado: [
      { SKU: "X168", KgPorHora: 1458 },
      { SKU: "X169", KgPorHora: 1468 },
      { SKU: "X396", KgPorHora: 1360.8 },
      { SKU: "71033", KgPorHora: 1132.87 },
      { SKU: "51793", KgPorHora: 1166.4 },
      { SKU: "10902", KgPorHora: 1360.8 },
      { SKU: "X220", KgPorHora: 1701 },
      { SKU: "X328", KgPorHora: 612.36 },
      { SKU: "X329", KgPorHora: 612.36 },
      { SKU: "10155", KgPorHora: 1093.5 },
      { SKU: "11121", KgPorHora: 1268.46 },
      { SKU: "11022", KgPorHora: 1360.8 },
      { SKU: "10407", KgPorHora: 1093.5 },
      { SKU: "X519", KgPorHora: 1093.5 },
      { SKU: "X450", KgPorHora: 1530.9 },
      { SKU: "X210", KgPorHora: 1701 },
      { SKU: "X135", KgPorHora: 534.6 },
      { SKU: "X050B", KgPorHora: 1458 },
      { SKU: "11060", KgPorHora: 1101.6 },
      { SKU: "11039", KgPorHora: 1101.6 },
      { SKU: "X452", KgPorHora: 1166.4 },
    ],
    tiempoCambio: tiempoCambio_MVC10,
  },
  {
    nombre: "ULMA 2",
    tiemposDeRebanado: [
      { SKU: "X168", KgPorHora: 1152 },
      { SKU: "X169", KgPorHora: 1152 },
      { SKU: "X103", KgPorHora: 1152 },
      { SKU: "X086", KgPorHora: 576 },
      { SKU: "X441", KgPorHora: 1036.8 },
      { SKU: "P8100", KgPorHora: 633.6 },
      { SKU: "CF0126", KgPorHora: 1036.8 },
      { SKU: "CF0280", KgPorHora: 538.56 },
      { SKU: "53865", KgPorHora: 1152 },
      { SKU: "CF3111", KgPorHora: 921.6 },
      { SKU: "X210", KgPorHora: 1152 },
      { SKU: "X1013", KgPorHora: 921.6 },
      { SKU: "X1012", KgPorHora: 921.6 },
    ],
    tiempoCambio: tiempoCambio_ULMA2,
  },
  {
    nombre: "MVC 12",
    tiemposDeRebanado: [
      { SKU: "51793", KgPorHora: 288 },
      { SKU: "10155", KgPorHora: 420 },
      { SKU: "X519", KgPorHora: 420 },
    ],
    tiempoCambio: tiempoCambio_MVC12,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 600,
    textAlign: "center",
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
  products,
}) {
  const [data, setData] = useState([]);
  const [totales, setTotales] = useState({
    totalKgPlan: 0,
    barrasTotales: 0,
    totalKgHr: 0,
    totalHrUtilizada: 0,
    totalTiemposSTDdeProduccion: 0,
    totalTiempoDeCambio: 0,
    totalMinUtilizados: 0,
  });

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

  const handleChange = (event, id) => {
    const newValue = event.target.value;
    if (newValue > 0 && newValue !== "") {
      setRealPlan((prevPlan) => {
        const updatedArrayPlan = prevPlan.map((item) =>
          item.idProducto === id
            ? { ...item, pedido: parseInt(newValue) }
            : item
        );
        return updatedArrayPlan;
      });
    }
  };

  useEffect(() => {
    let sumaMinUtilizados = 0;
    setTotales({
      totalKgPlan: 0,
      barrasTotales: 0,
      totalKgHr: 0,
      totalHrUtilizada: 0,
      totalTiemposSTDdeProduccion: 0,
      totalTiempoDeCambio: 0,
      totalMinUtilizados: 0,
    });
    const orderRealPlan = _.flatMap(realPlan, (item) => {
      if (item.dividir) {
        const min_kg_carga = _.find(products, {
          id: item.idProducto,
        })?.min_kg_carga;
        const objeto1 = {
          ajuste_carga: item.ajuste_carga,
          destino: item.destino,
          idProducto: item.idProducto,
          pedido: min_kg_carga * item.ajuste_carga,
          sku: item.sku,
        };
        const objeto2 = {
          ajuste_carga: item.ajuste_carga_extra,
          destino: item.destino_doble,
          idProducto: item.idProducto,
          pedido: min_kg_carga * item.ajuste_carga_extra,
          sku: item.sku,
        };
        return [objeto1, objeto2];
      } else {
        return {
          ajuste_carga: item.ajuste_carga,
          destino: item.destino,
          idProducto: item.idProducto,
          pedido: item.pedido,
          sku: item.sku,
        };
      }
    });
    const filterByBaler = _.filter(orderRealPlan, (item) => {
      return item.destino === selectBaler;
    });
    const newData = _.map(filterByBaler, (obj, index, arr) => {
      let skuActual = obj["sku"];
      let skuAnterior = index > 0 ? arr[index - 1]["sku"] : "";
      let kgHr = obtenerKgHr(obj["sku"]);
      let hrUtilizada = kgHr === 0 ? 0 : obj["pedido"] / kgHr;
      let tiemSTDdeProduccion =
        obj["sku"] !== ""
          ? moment.duration(7, "minutes")
          : moment.duration(0, "minutes");
      let tiempoDeCambio =
        index === 0 ? 0 : obtenerTiempodeCambio(skuAnterior, skuActual);
      let minUtilizados = moment
        .duration(hrUtilizada, "hours")
        .add(tiempoDeCambio, "minutes")
        .add(tiemSTDdeProduccion, "minutes");
      let barras = 10;
      sumaMinUtilizados += minUtilizados.asMinutes();
      setTotales((prevTotales) => {
        return {
          ...prevTotales,
          totalKgPlan: prevTotales.totalKgPlan + obj["pedido"],
          barrasTotales: prevTotales.barrasTotales + barras,
          totalKgHr: prevTotales.totalKgHr + kgHr,
          totalHrUtilizada: prevTotales.totalHrUtilizada + hrUtilizada,
          totalTiemposSTDdeProduccion:
            prevTotales.totalTiemposSTDdeProduccion +
            tiemSTDdeProduccion.asMinutes(),
          totalTiempoDeCambio: prevTotales.totalTiempoDeCambio + tiempoDeCambio,
          totalMinUtilizados: sumaMinUtilizados,
        };
      });

      return {
        ...obj,
        prioridad: index + 1,
        kg_hora: kgHr,
        hr_utilizada: hrUtilizada.toFixed(1),
        tiempo_std: tiemSTDdeProduccion.asMinutes(),
        tiempo_cambio: tiempoDeCambio === 0 ? 0 : tiempoDeCambio,
        min_utilizados: minUtilizados.asMinutes().toFixed(1),
        barras: barras,
      };
    });
    setData(newData);
    setDatosParaTablaRes(sumaMinUtilizados);
  }, [selectBaler, realPlan]);
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
          <TableRow></TableRow>
          <TableRow>
            <StyledTableCell align="left" colSpan={1}>
              Prioridad
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              SKU
            </StyledTableCell>
            <StyledTableCell
              align="left"
              colSpan={1}
              style={{ minWidth: "6rem" }}
            >
              KG Plan
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              # Barras
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              KG/HR
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              HR Utilizada
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              Tiempo STD <br /> de Producción
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              Tiempo de <br /> Cambio
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              Minutos <br /> Utilizados
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (row) => (
            <StyledTableRow key={row.idProducto}>
              <StyledTableCell align="center" sx={{ width: "5%" }}>
                {row.prioridad}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.sku}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                <Input
                  type="number"
                  value={row.pedido}
                  onChange={(e) => handleChange(e, row.idProducto)}
                  style={{ fontSize: "inherit" }}
                />
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.barras}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.kg_hora}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.hr_utilizada}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.tiempo_std}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.tiempo_cambio}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "10%" }}>
                {row.min_utilizados}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>
              <b>Totales</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>{totales.totalKgPlan}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.barrasTotales}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalKgHr.toFixed(1)}</b>
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

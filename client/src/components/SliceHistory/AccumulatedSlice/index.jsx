import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import _ from "lodash";
// import { useTheme } from "@mui/material/styles";

// const data = [
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
//   {
//     sku: "X510",
//     plan: 18000,
//     lunes: 2000,
//     martes: 2000,
//     miercoles: 2000,
//     jueves: 2000,
//     viernes: 2000,
//     sabado: 2000,
//     total: 12000,
//     dif: 6000,
//   },
// ];

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

const TableConsolidado = ({ data }) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 320 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell align="center">Plan 14w</StyledTableCell>
              <StyledTableCell align="center">Lunes</StyledTableCell>
              <StyledTableCell align="center">Martes</StyledTableCell>
              <StyledTableCell align="center">Miercoles</StyledTableCell>
              <StyledTableCell align="center">Jueves</StyledTableCell>
              <StyledTableCell align="center">Viernes</StyledTableCell>
              <StyledTableCell align="center">Sabado</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">Dif</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(data, (row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.sku}
                </StyledTableCell>
                <StyledTableCell align="center">{row.plan}</StyledTableCell>
                <StyledTableCell align="center">{row.lunes}</StyledTableCell>
                <StyledTableCell align="center">{row.martes}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.miercoles}
                </StyledTableCell>
                <StyledTableCell align="center">{row.jueves}</StyledTableCell>
                <StyledTableCell align="center">{row.viernes}</StyledTableCell>
                <StyledTableCell align="center">{row.sabado}</StyledTableCell>
                <StyledTableCell align="center">{row.total}</StyledTableCell>
                <StyledTableCell align="center">{row.dif}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableConsolidado;

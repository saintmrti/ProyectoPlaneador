import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

export default function TablaRes({ total, minutosPorDia }) {
  const [data, setData] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    setData([
      { name: "Total Min Utilizados:", tiempo: total },
      { name: "Tiempo disponible:", tiempo: minutosPorDia - total },
    ]);
  }, [total, minutosPorDia]);
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowY: "auto",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                background:
                  data[1]?.tiempo < 0
                    ? theme.palette.status.error
                    : theme.palette.status.success,
                fontWeight: 600,
                color: "white",
              }}
              colSpan={2}
            >
              Resumen
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: row.tiempo < 0 ? "#FF4D5D" : "" }}
              >
                {Math.round(row.tiempo * 10 ** 1) / 10 ** 1}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

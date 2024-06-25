import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const dataInicial = [
  {
    MOLDE: "USO DE RAKCS",
    "Virg 4.5": 0,
    Sandw: 0,
    "11 x 14": 0,
    "3.2 kg": 0,
    Lunch: 6,
    Tortero: 3,
    "Mand 6": 3,
    Bala: 23.5,
    "PICNIC 5": 0,
    "11 x 11": 24,
    "11 x 16": 5,
  },
  {
    MOLDE: "INV RACKS",
    "Virg 4.5": 7,
    Sandw: 0,
    "11 x 14": 3,
    "3.2 kg": 0,
    Lunch: 6,
    Tortero: 5,
    "Mand 6": 5,
    Bala: 21,
    "PICNIC 5": 11,
    "11 x 11": 14,
    "11 x 16": 6,
  },
  {
    MOLDE: "1er T 6am -5pm",
    "Virg 4.5": 4.0,
    Sandw: 2,
    "11 x 14": 6.0,
    "3.2 kg": 3,
    Lunch: 9,
    Tortero: 0,
    "Mand 6": 0,
    Bala: 18.5,
    "PICNIC 5": 6,
    "11 x 11": 0,
    "11 x 16": 5.0,
  },
  {
    MOLDE: "2do y 3er T 5pm - 6am",
    "Virg 4.5": 0,
    Sandw: 0,
    "11 x 14": 0,
    "3.2 kg": 0,
    Lunch: 6,
    Tortero: 3,
    "Mand 6": 3,
    Bala: 5,
    "PICNIC 5": 6,
    "11 x 11": 0,
    "11 x 16": 0,
  },
];

const columns = [
  "",
  "MOLDE",
  "Virg 4.5",
  "Sandw",
  "11 x 14",
  "3.2 kg",
  "Lunch",
  "Tortero",
  "Mand 6",
  "Bala",
  "PICNIC 5",
  "11 x 11",
  "11 x 16",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e2e2e2",
    color: "#13100c",
    fontWeight: 600,
    textAlign: "center",
    padding: "2px",
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "5px",
  },
}));
const StyledTableCell_1 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //color: 'white',
    fontWeight: 600,
    textAlign: "center",
    padding: "2px",
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: "10px",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    //Se cambio de odd a even
    backgroundColor: "rgba(223, 235, 237, 0.5)",
    textAlign: "center",
    padding: "2px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Cell({ value }) {
  return <StyledTableCell align="center">{value}</StyledTableCell>;
}

export default function RackTable({ semana, color, extra }) {
  const [data, setData] = useState(dataInicial);

  return (
    <TableContainer
      component={Paper}
      sx={{
        //width: "100%",
        marginBottom: 1,
        overflowY: "auto",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table sx={{ minWidth: 80 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              MOLDE
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              Virg 4.5
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              Sandw
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              11 x 14
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              3.2 kg
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              Lunch
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              Tortero
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              Mand 6
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              Bala
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              PICNIC 5
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              11 x 11
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `withe` }}
              colSpan={1}
            >
              11 X 16
            </StyledTableCell_1>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column, index) =>
                extra ? (
                  <Cell key={column} value={row[column]} />
                ) : (
                  column !== "" && <Cell key={column} value={row[column]} />
                )
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

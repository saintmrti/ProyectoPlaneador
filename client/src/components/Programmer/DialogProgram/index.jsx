import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

import TablaTiempoSTD from "./TablaTiempoSTD";
import TablaRes from "./TablaRes";
import { insertSlicedRequest } from "../../../slices/sliced";
import TablaProgramador from "./TablaProgramador";

export default function DialogProgram({
  open,
  setOpen,
  realPlan,
  setRealPlan,
  date,
  products,
}) {
  const dispatch = useDispatch();
  const [datosParaTablaRes, setDatosParaTablaRes] = useState(0);
  const [selectBaler, setSelectBaler] = useState("MVC 10");

  const handleOnClick = () => {
    setOpen(!open);
    dispatch(insertSlicedRequest({ products: realPlan, date }));
    setRealPlan(null);
  };

  const handleListChange = (e) => {
    const value = e.target.value;
    setSelectBaler(value);
  };

  const isMvc12 = _.some(realPlan, { destino: "MVC 12" });

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="x1"
      >
        <IconButton
          aria-label="close"
          size="small"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="flex justify-between items-end">
          <DialogTitle id="alert-dialog-title">Calcular Capacidad</DialogTitle>
          <FormControl
            sx={{ width: "12rem", marginRight: "3rem" }}
            size="small"
          >
            <InputLabel id="list-selector-label">Programador</InputLabel>
            <Select
              labelId="list-selector-label"
              id="list-selector"
              value={selectBaler}
              label="Select List"
              onChange={handleListChange}
            >
              <MenuItem value="MVC 10">MVC 10</MenuItem>
              <MenuItem value="ULMA 2">ULMA 2</MenuItem>
              {isMvc12 ? <MenuItem value="MVC 12">MVC 12</MenuItem> : null}
            </Select>
          </FormControl>
        </div>
        <DialogContent sx={{ overflowY: "auto", paddingTop: 2 }}>
          <TablaProgramador
            realPlan={realPlan}
            setDatosParaTablaRes={setDatosParaTablaRes}
            setRealPlan={setRealPlan}
            selectBaler={selectBaler}
            products={products}
          />
        </DialogContent>
        <DialogContent sx={{ display: "flex", gap: 1 }}>
          <TablaTiempoSTD />
          <TablaRes total={datosParaTablaRes} minutosPorDia={1080} />
        </DialogContent>
        <DialogActions sx={{ marginRight: "20px" }}>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleOnClick} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import Checkbox from "@mui/material/Checkbox";
import _ from "lodash";

// import { updateProductsRequest } from "../../../../slices/products";
// import { getParameters } from "../../../../selectors/parameters";
import { getSlicedCapacity } from "../../../../selectors/capacity";
import { calculatePedido } from "../calculateSliced";

export default function SlicedDialog({
  setOpen,
  open,
  plan,
  setPlan,
  realPlan,
  setRealPlan,
  product,
  calculateInvFinal3,
  calculateDifInvFinal,
}) {
  const { register, handleSubmit, reset, setValue } = useForm();
  // const dispatch = useDispatch();
  // const [change, setChange] = useState(false);
  const [divideCharge, setDivideCharge] = useState(false);
  const capacity = useSelector(getSlicedCapacity);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const onSubmit = (values) => {
    const pedido = () => {
      if (capacity) {
        const sku = _.find(capacity, {
          sku: product?.producto,
        });
        if (values.divider) {
          const load = calculatePedido(values.load, sku);
          const load_extra = calculatePedido(values.load_extra, sku);
          return load + load_extra;
        } else {
          return calculatePedido(values.load, sku);
        }
      }
    };
    const updatedData = plan.map((row) =>
      row.idProducto === product.idProducto
        ? {
            ...row,
            ajuste_carga_extra: values.load_extra ? values.load_extra : 0,
            destino_doble: values.baler_extra ? values.baler_extra : "",
            dividir: values.divider,
            ajuste_carga: values.load,
            pedido: pedido(),
            inv_final_3: calculateInvFinal3(
              row?.inv_final_1,
              row?.prox_salida,
              pedido()
            ),
            dif_inv_final: calculateDifInvFinal(
              row?.inv_final_1,
              row?.prox_salida,
              row?.tiendita,
              pedido()
            ),
          }
        : row
    );
    setPlan(updatedData);
    const productExist = _.some(realPlan, {
      idProducto: product?.idProducto,
    });
    if (productExist) {
      if (values.load > 0) {
        const updatedRealPlan = realPlan.map((row) =>
          row.idProducto === product?.idProducto
            ? {
                ...row,
                ajuste_carga: values.load,
                pedido: pedido(),
                destino: values.baler,
                dividir: values.divider,
                ajuste_carga_extra: values.load_extra ? values.load_extra : 0,
                destino_doble: values.baler_extra ? values.baler_extra : "",
              }
            : row
        );
        setRealPlan(updatedRealPlan);
      } else {
        const updatedRealPlan = realPlan.filter(
          (row) => row.idProducto !== product?.idProducto
        );
        setRealPlan(updatedRealPlan);
      }
    } else {
      if (values.baler) {
        setRealPlan([
          ...realPlan,
          {
            idProducto: product?.idProducto,
            sku: product?.producto,
            ajuste_carga: parseInt(values.load),
            pedido: pedido(),
            destino: values.baler,
            dividir: values.divider,
            ajuste_carga_extra: values.divider
              ? parseInt(values.load_extra)
              : 0,
            destino_doble: values.baler_extra ? values.baler_extra : "",
          },
        ]);
      }
    }
    setOpen(false);
    setDivideCharge(false);
    reset();
  };

  useEffect(() => {
    if (product) {
      setValue("load", product?.ajuste_carga || 0);
      setValue("baler", product?.destino || "");
      // setValue("charge", product?.min_kg_carga || 0);
      setValue("load_extra", product?.ajuste_carga_extra || 0);
      setValue("baler_extra", product?.destino_doble || "");
      setValue("divider", product?.dividir || false);
      setDivideCharge(product?.dividir || false);
    }
  }, [product, setValue]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="x1"
    >
      <IconButton
        aria-label="close"
        size="small"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ width: 300 }}>
          <Typography variant="h6" component="h1" align="center">
            Editar pedido de{" "}
            <span className="font-semibold">{product?.producto}</span>
          </Typography>
          {/* <div className="flex items-center justify-center">
            <Typography variant="body1" component="p" align="center">
              ({product?.min_kg_carga}kg por carga)
            </Typography>
            <EditIcon
              onClick={handleCharge}
              sx={{
                width: "1.2rem",
                cursor: "pointer",
                "&:hover": {
                  color: "status.info",
                },
              }}
            />
          </div> */}
          <div className="flex flex-col justify-center items-center">
            <TextField
              label="Carga"
              type="number"
              size="small"
              defaultValue={product?.ajuste_carga || 0}
              sx={{ marginTop: 2, width: "12rem" }}
              inputProps={{ min: 0 }}
              {...register("load", { required: true, min: 0 })}
            />
            <FormControl sx={{ marginTop: 2, width: "12rem" }} size="small">
              <InputLabel id="list-selector-label">Destino</InputLabel>
              <Select
                labelId="list-selector-label"
                id="list-selector"
                label="Select List"
                defaultValue={product?.destino || ""}
                {...register("baler", { required: true })}
              >
                <MenuItem value="MVC 10">MVC 10</MenuItem>
                {/* <MenuItem value="ULMA 2">ULMA 2</MenuItem> */}
              </Select>
            </FormControl>
            {divideCharge && (
              <Fragment>
                <TextField
                  label="Carga extra"
                  type="number"
                  size="small"
                  defaultValue={product?.ajuste_carga_extra || 0}
                  sx={{ marginTop: 2, width: "12rem" }}
                  inputProps={{ min: 0 }}
                  {...register("load_extra", { required: true, min: 0 })}
                />
                <FormControl sx={{ marginTop: 2, width: "12rem" }} size="small">
                  <InputLabel id="list-selector-label">Destino</InputLabel>
                  <Select
                    labelId="list-selector-label"
                    id="list-selector"
                    label="Select List"
                    defaultValue={product?.destino_doble || ""}
                    {...register("baler_extra", { required: true })}
                  >
                    <MenuItem value="MVC 10">MVC 10</MenuItem>
                    <MenuItem value="ULMA 2">ULMA 2</MenuItem>
                  </Select>
                </FormControl>
              </Fragment>
            )}
            {/* <FormControlLabel
              control={
                <Checkbox
                  {...register("divider")}
                  checked={divideCharge}
                  onChange={(e) => {
                    setDivideCharge(e.target.checked);
                    if (!e.target.checked) {
                      setValue("load_extra", 0);
                      setValue("baler_extra", "");
                    }
                  }}
                />
              }
              label="Dividir carga"
            /> */}
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button size="small" variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button size="small" variant="contained" type="submit">
            Aceptar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

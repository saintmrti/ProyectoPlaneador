import _ from "lodash";
// import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";

import { getListSku } from "../../../selectors/capacity";
import { insertProductionRequest } from "../../../slices/production";

export default function ProductionForm({
  planProd,
  setProduct,
  date,
  product,
}) {
  const { register, handleSubmit, reset, setValue, control } = useForm({
    defaultValues: {
      producto: null,
    },
  });

  const dispatch = useDispatch();

  const listSku = useSelector(getListSku);
  const process = planProd[planProd.length - 1]?.procesos;
  const skuOptions = _.map(listSku, "sku");

  const onSubmit = (values) => {
    const production_order = {
      idSku: values.producto,
      idMaquina: 6,
      fecha_mezclado: `${date} ${values.mezcladora_inicio}:00`,
      destino: values.destino,
    };
    dispatch(insertProductionRequest({ production_order }));
    setProduct(null);
    reset({
      producto: null,
    });
    // const capacity = _.find(listSku, { sku: values.producto });
    // if (capacity) {
    //   const addProcess = calculateTiming(values.mezcladora_inicio, capacity);
    //   const newProduction = {
    //     sec: planProd.length + 1,
    //     producto: values.producto,
    //     destino: values.destino,
    //     rack: capacity?.rack,
    //     kg_lote: capacity?.kg_lote,
    //     no_rack: capacity?.no_rack,
    //     tipo_emulsion: capacity?.tipo_emulsion,
    //     guardado: false,
    //     procesos: addProcess,
    //   };
    //   setPlanProd([...planProd, newProduction]);
    // }
  };

  // const calculateTiming = (mezcladoInicio, capacity) => {
  //   try {
  //     const mezclado_inicio = mezcladoInicio || "04:00";
  //     const mezclado_fin = calculateTime(mezclado_inicio, capacity?.mezclado);
  //     const embutido_inicio = calculateTime(
  //       mezclado_fin,
  //       capacity?.te_mezclado_embutido
  //     );
  //     const embutido_fin = calculateTime(embutido_inicio, capacity?.embutido);
  //     const cocimiento_inicio = calculateTime(
  //       embutido_fin,
  //       capacity?.te_embutido_cocimiento
  //     );
  //     const cocimiento_fin = calculateTime(
  //       cocimiento_inicio,
  //       capacity?.cocimiento
  //     );
  //     const enfriamiento_inicio = calculateTime(
  //       cocimiento_fin,
  //       capacity?.te_cocimiento_enfriamiento
  //     );
  //     const enfriamiento_fin = calculateTime(
  //       enfriamiento_inicio,
  //       capacity?.enfriamiento
  //     );
  //     const desmolde_inicio = calculateTime(
  //       enfriamiento_fin,
  //       capacity?.te_enfriamiento_desmolde
  //     );
  //     const desmolde_fin = calculateTime(desmolde_inicio, capacity?.desmolde);
  //     const atemperado_inicio = calculateTime(desmolde_fin, capacity?.te_desmolde_atemperado);
  //     const atemperado_fin = calculateTime(atemperado_inicio, capacity?.atemperado);
  //     const rebanado_inicio = calculateTime(atemperado_fin, capacity?.te_atemperado_rebanado);
  //     const rebanado_fin = calculateTime(rebanado_inicio, capacity?.rebanado);
  //     const entrega_inicio = calculateTime(rebanado_fin, capacity?.te_rebanado_entrega);
  //     const entrega_fin = calculateTime(entrega_inicio, capacity?.entrega);
  //     const process = [
  //       {
  //         nombre: "Mezclado",
  //         inicio: mezclado_inicio,
  //         fin: mezclado_fin,
  //       },
  //       {
  //         nombre: "Embutido",
  //         inicio: embutido_inicio,
  //         fin: embutido_fin,
  //       },
  //       {
  //         nombre: "Cocimiento",
  //         inicio: cocimiento_inicio,
  //         fin: cocimiento_fin,
  //       },
  //       {
  //         nombre: "Enfriamiento",
  //         inicio: enfriamiento_inicio,
  //         fin: enfriamiento_fin,
  //       },
  //       {
  //         nombre: "Desmolde",
  //         inicio: desmolde_inicio,
  //         fin: desmolde_fin,
  //       },
  //       {
  //         nombre: "Atemperado",
  //         inicio: null,
  //         fin: null,
  //       },
  //       {
  //         nombre: "Rebanado",
  //         inicio: null,
  //         fin: null,
  //       },
  //       {
  //         nombre: "Entrega",
  //         inicio: null,
  //         fin: null,
  //       },
  //     ];
  //     return process;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const calculateTime = (startTime, min) => {
  //   return moment(startTime, "HH:mm").add(min, "minutes").format("HH:mm");
  // };

  useEffect(() => {
    setValue("rack", _.find(listSku, { sku: product })?.rack);
    setValue("kg_lote", _.find(listSku, { sku: product })?.kg_lote);
    setValue("no_rack", _.find(listSku, { sku: product })?.no_rack);
    setValue("tipo_emulsion", _.find(listSku, { sku: product })?.tipo_emulsion);
    setValue(
      "mezcladora_inicio",
      process ? _.find(process, { nombre: "Mezclado" })?.fin : "04:00"
    );
  }, [product, process, setValue, listSku]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl mb-5 text-center">Seleccionar SKU</h1>
      <div className="flex flex-col items-center w-full">
        <Controller
          name="producto"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              disablePortal
              id="combo-box-demo"
              options={skuOptions}
              sx={{ width: "15rem", mb: 2 }}
              size="small"
              renderInput={(params) => <TextField {...params} label="SKU" />}
              onChange={(_, value) => {
                setProduct(value);
                field.onChange(value);
              }}
            />
          )}
        />
        <FormControl sx={{ width: "15rem", mb: 2 }} size="small">
          <InputLabel id="destino">Destino</InputLabel>
          <Select
            labelId="destino"
            id="select-destino"
            label="Destino"
            autoComplete="off"
            defaultValue="MVC10"
            {...register("destino", {
              required: true,
            })}
          >
            <MenuItem value="MVC10">MVC 10</MenuItem>
            {/* <MenuItem value="MVC12">MVC 12</MenuItem> */}
            <MenuItem value="ULMA2">ULMA 2</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Mezcladora Inicio"
          type="time"
          size="small"
          InputLabelProps={{ shrink: true }}
          {...register("mezcladora_inicio", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Rack"
          type="text"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.rack : ""}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Kg Lote"
          autoComplete="off"
          type="number"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.kg_lote : ""}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="No Racks"
          autoComplete="off"
          type="number"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.no_rack : ""}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Tipo"
          autoComplete="off"
          type="text"
          size="small"
          value={
            product ? _.find(listSku, { sku: product })?.tipo_emulsion : ""
          }
        />
        <div className="flex justify-center mt-8">
          <Button variant="contained" type="submit" size="small">
            Agregar
          </Button>
        </div>
      </div>
    </form>
  );
}

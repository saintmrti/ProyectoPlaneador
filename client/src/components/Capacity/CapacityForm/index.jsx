import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import _ from "lodash";
import Button from "@mui/material/Button";

import { getLines, getMachines } from "../../../selectors/capacity";
import {
  updateCapacityRequest,
  insertCapacityRequest,
} from "../../../slices/capacity";
import { AllFields } from "./AllFields";
import { SlicedFields } from "./SlicedFields";
import { AllTimeFields } from "./AllTimeFields";
import { SlicedTimeFields } from "./SlicedTimeFields";

const CapacityForm = ({
  selectedArr,
  editProduct,
  setOpenForm,
  showSliced,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();

  const [selectedLinea, setSelectedLinea] = useState();
  const [machines, setMachines] = useState([]);
  // const [times, setTimes] = useState(false);
  const linesList = useSelector(getLines);
  const machinesList = useSelector(getMachines);

  const product = _.find(selectedArr, { id: editProduct });

  const onSubmit = (values) => {
    const sku = {
      idSku: editProduct,
      updatedSliced: showSliced,
      ...values,
    };
    editProduct
      ? dispatch(updateCapacityRequest(sku))
      : dispatch(insertCapacityRequest(sku));
    reset();
    setOpenForm(false);
  };

  // function convertMinutesAsHours(minutos) {
  //   const horas = Math.floor(minutos / 60);
  //   const minutosRestantes = minutos % 60;
  //   const horaFormateada = moment({
  //     hour: horas,
  //     minute: minutosRestantes,
  //   }).format("HH:mm");
  //   return horaFormateada;
  // }

  useEffect(() => {
    if (selectedLinea) {
      const machines = _.filter(machinesList, { idLinea: selectedLinea });
      setMachines(machines);
    }
  }, [machinesList, selectedLinea, setValue]);

  useEffect(() => {
    if (product) {
      setValue("sku", product.sku);
      setValue("descripcion", product.descripcion);
      setValue("kg_lote", product.kg_lote);
      setValue("rack", product.rack);
      setValue("no_rack", product.no_rack);
      setValue("tipo_emulsion", product.tipo_emulsion);
      setValue("tinas_emulsion", product.tinas_emulsion);
      setValue("tinas_fresco", product.tinas_fresco);
      setValue("tinas_congelado", product.tinas_congelado);
      setValue("barra", product.barra);
      setValue("ingredientes_secos", product.ingredientes_secos);
      setValue("te_ingredientes_salmuera", product.te_ingredientes_salmuera);
      setValue("salmuerizador", product.salmuerizador);
      setValue("te_salmuera_mezclado", product.te_salmuera_mezclado);
      setValue("emulsiones", product.emulsiones);
      setValue("te_emulsiones_mezclado", product.te_emulsiones_mezclado);
      setValue("corte_deshuese_fresco", product.corte_deshuese_fresco);
      setValue("te_cyd_emulsiones", product.te_cyd_emulsiones);
      setValue("te_cyd_mezclado", product.te_cyd_mezclado);
      setValue("mezclado", product.mezclado);
      setValue("te_mezclado_embutido", product.te_mezclado_embutido);
      setValue("embutido", product.embutido);
      setValue("te_embutido_cocimiento", product.te_embutido_cocimiento);
      setValue("cocimiento", product.cocimiento);
      setValue(
        "te_cocimiento_enfriamiento",
        product.te_cocimiento_enfriamiento
      );
      setValue("enfriamiento", product.enfriamiento);
      setValue("te_enfriamiento_desmolde", product.te_enfriamiento_desmolde);
      setValue("atemperado", product.atemperado);
      setValue("te_atemperado_rebanado", product.te_atemperado_rebanado);
      setValue("rebanado", product.rebanado);
      setValue("te_rebanado_entrega", product.te_rebanado_entrega);
      setValue("entrega", product.entrega);
      setValue("te_desmolde_atemperado", product.te_desmolde_atemperado);
      setValue("acomodo_barras_cama", product.acomodo_barras_cama);
      setValue("no_racks_carga", product.no_racks_carga);
      setValue("kg_barra", product.kg_barra);
      setValue("rendimiento", product.rendimiento);
    }
  }, [product, setValue]);

  return (
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <h1 className="text-2xl mb-5 w-full text-center">
          {editProduct ? "Editar SKU" : "Agregar SKU"}
        </h1>
        <div className="grid grid-cols-5 gap-5 mb-5">
          <TextField
            label="SKU"
            type="text"
            autoComplete="off"
            size="small"
            {...register("sku", { required: true })}
          />
          {!editProduct && (
            <Fragment>
              <FormControl size="small">
                <InputLabel id="linea">Linea</InputLabel>
                <Select
                  labelId="linea"
                  id="select-linea"
                  label="Linea"
                  defaultValue=""
                  onChange={(e) => setSelectedLinea(e.target.value)}
                >
                  {_.map(linesList, (item) => (
                    <MenuItem key={item.id} value={item.idLinea}>
                      {item.linea}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel id="machine">Maquina</InputLabel>
                <Select
                  labelId="machine"
                  id="select-machine"
                  label="Maquina"
                  defaultValue=""
                  {...register("idMaquina", {
                    required: true,
                  })}
                >
                  {_.map(machines, (item) => (
                    <MenuItem key={item.id} value={item.idMaquina}>
                      {item.maquina}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Fragment>
          )}
          {!editProduct ? (
            <>
              <AllFields register={register} product={product} />
              <SlicedFields register={register} />
            </>
          ) : (
            <>
              {!showSliced ? (
                <AllFields register={register} product={product} />
              ) : (
                <SlicedFields register={register} />
              )}
            </>
          )}
        </div>
        <h1 className="text-2xl mb-5 w-full text-center">Tiempos (m)</h1>
        <div className="grid grid-cols-6 gap-5 mb-10">
          {!editProduct ? (
            <>
              <AllTimeFields register={register} />
              <SlicedTimeFields register={register} />
            </>
          ) : (
            <>
              {!showSliced ? (
                <AllTimeFields register={register} />
              ) : (
                <SlicedTimeFields register={register} />
              )}
            </>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            {editProduct ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CapacityForm;

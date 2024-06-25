import _ from "lodash";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { getListSku } from "../../../../selectors/capacity";
import {
  insertParametersRequest,
  updateParametersRequest,
} from "../../../../slices/parameters";

export default function SlicedForm({
  parameters,
  selectedMachine,
  setOpenParams,
  setParams,
  params,
}) {
  const { register, handleSubmit, reset, setValue, control } = useForm({
    defaultValues: {
      producto: null,
    },
  });

  const dispatch = useDispatch();
  const listSku = useSelector(getListSku);
  const slicedSku = _.filter(listSku, { descripcion: "Jamones Rebanados" });
  const parameterSkus = _.map(parameters, "sku");
  const filteredSku = _.filter(
    slicedSku,
    (item) => !_.includes(parameterSkus, item.sku)
  );
  const skuOptions = _.map(filteredSku, "sku");

  const onSubmit = (values) => {
    if (params) {
      dispatch(updateParametersRequest({ ...values, idSku: params.id }));
    } else {
      const sku = _.find(parameters, { sku: values.producto });
      if (sku) {
        console.log("SKU already exists");
      } else {
        const idSku = _.find(slicedSku, { sku: values.producto })?.id;
        const skuParams = {
          idSku,
          idEmpacadora: selectedMachine,
          ciclos_minutos: values.ciclos_minutos,
          kg_paquete: values.kg_paquete,
          paquetes_avance: values.paquetes_avance,
        };
        dispatch(insertParametersRequest(skuParams));
      }
    }
    setParams(null);
    setOpenParams(false);
    reset({
      producto: null,
    });
  };

  useEffect(() => {
    setValue("ciclos_minutos", params?.ciclos_minutos);
    setValue("kg_paquete", params?.kg_paquete);
    setValue("paquetes_avance", params?.paquetes_avance);
  }, [params]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl mb-5 text-center">
        {params ? `Editar ${params?.sku}` : "Seleccionar SKU"}
      </h1>
      <div className="flex flex-col items-center w-full">
        {!params && (
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
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
        )}
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Ciclos por minuto"
          autoComplete="off"
          type="number"
          size="small"
          inputProps={{ step: "0.01" }}
          {...register("ciclos_minutos", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Kg por paquete"
          autoComplete="off"
          type="number"
          size="small"
          inputProps={{ step: "0.01" }}
          {...register("kg_paquete", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Paquetes por avance"
          autoComplete="off"
          type="number"
          size="small"
          inputProps={{ step: "0.01" }}
          {...register("paquetes_avance", { required: true })}
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

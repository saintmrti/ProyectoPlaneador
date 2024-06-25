import TextField from "@mui/material/TextField";

export const AllTimeFields = ({ register }) => {
  return (
    <>
      <TextField
        label="Ingredientes secos"
        type="number"
        size="small"
        {...register("ingredientes_secos", { required: false })}
      />
      <TextField
        label="T.E. a salmuerizador"
        type="number"
        size="small"
        {...register("te_ingredientes_salmuera", { required: false })}
      />
      <TextField
        label="Salmuerizador"
        type="number"
        size="small"
        {...register("salmuerizador", { required: false })}
      />
      <TextField
        label="T.E. a mezclado"
        type="number"
        size="small"
        {...register("te_salmuera_mezclado", { required: false })}
      />
      <TextField
        label="Emulsiones"
        type="number"
        size="small"
        {...register("emulsiones", { required: false })}
      />
      <TextField
        label="T.E. a mezclado"
        type="number"
        size="small"
        {...register("te_emulsiones_mezclado", { required: false })}
      />
      <TextField
        label="Corte y Deshuese"
        type="number"
        size="small"
        {...register("corte_deshuese_fresco", { required: false })}
      />
      <TextField
        label="T.E. a emulsiones"
        type="number"
        size="small"
        {...register("te_cyd_emulsiones", { required: false })}
      />
      <TextField
        label="T.E. a mezclado"
        type="number"
        size="small"
        {...register("te_cyd_mezclado", { required: false })}
      />
      <TextField
        label="Mezclado"
        type="number"
        size="small"
        {...register("mezclado", { required: false })}
      />
      <TextField
        label="T.E. a embutido"
        type="number"
        size="small"
        {...register("te_mezclado_embutido", { required: false })}
      />
      <TextField
        label="Embutido"
        type="number"
        size="small"
        {...register("embutido", { required: false })}
      />
      <TextField
        label="T.E. a cocimiento"
        type="number"
        size="small"
        {...register("te_embutido_cocimiento", { required: false })}
      />
      <TextField
        label="Cocimiento"
        type="number"
        size="small"
        {...register("cocimiento", { required: false })}
      />
      <TextField
        label="T.E. a enfriamiento"
        type="number"
        size="small"
        {...register("te_cocimiento_enfriamiento", { required: false })}
      />
      <TextField
        label="Enfriamiento"
        type="number"
        size="small"
        {...register("enfriamiento", { required: false })}
      />
      <TextField
        label="T.E. a pre-atemperado"
        type="number"
        size="small"
        {...register("te_enfriamiento_desmolde", { required: false })}
      />
    </>
  );
};

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { dataFamily } from "../../CapacityTable/dummyData";

export const AllFields = ({ register, product }) => {
  return (
    <>
      <FormControl size="small">
        <InputLabel id="family">Familia</InputLabel>
        <Select
          labelId="family"
          id="select-family"
          label="Familia"
          defaultValue={product?.descripcion || ""}
          {...register("descripcion", {
            required: true,
          })}
        >
          {dataFamily.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Lote"
        type="number"
        inputProps={{
          min: 0,
        }}
        size="small"
        autoComplete="off"
        {...register("kg_lote", { required: false })}
      />
      <TextField
        label="Rack"
        type="text"
        size="small"
        autoComplete="off"
        {...register("rack", { required: false })}
      />
      <TextField
        label="No. Rack"
        type="number"
        autoComplete="off"
        inputProps={{
          step: "0.01",
        }}
        size="small"
        {...register("no_rack", {
          required: false,
          pattern: /^[0-9]+([.][0-9]+)?$/,
        })}
      />
      <TextField
        label="Tipo Emulsión"
        autoComplete="off"
        type="text"
        size="small"
        {...register("tipo_emulsion", { required: false })}
      />
      <TextField
        label="Tinas Emulsión"
        autoComplete="off"
        type="number"
        size="small"
        {...register("tinas_emulsion", { required: false })}
      />
      <TextField
        label="Tinas Fresco"
        autoComplete="off"
        type="number"
        size="small"
        {...register("tinas_fresco", { required: false })}
      />
      <TextField
        label="Tinas Congelado"
        autoComplete="off"
        type="number"
        size="small"
        {...register("tinas_congelado", { required: false })}
      />
      <TextField
        label="Barra"
        type="text"
        autoComplete="off"
        size="small"
        {...register("barra", { required: true })}
      />
    </>
  );
};

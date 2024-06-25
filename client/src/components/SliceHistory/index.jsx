import { useState } from "react";
import _ from "lodash";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import { fetchSlicedRequest } from "../../slices/sliced";
import { fetchRequirementRequest } from "../../slices/requirement";
import AccumulatedSlice from "./AccumulatedSlice";
import SlicedPlanTable from "./SlicedPlanTable";
import { Spinner } from "../Spinner";
import { changeDate } from "../../slices/date";
import { getHistory } from "../../selectors/sliced";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SliceHistory = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.date);
  const [machine, setMachine] = useState("all");
  const { history, slicedByDate } = useSelector((state) =>
    getHistory(state, machine)
  );
  const { isFetching, didError } = useSelector((state) => state.sliced);
  const handleChangeDate = (newDate) => {
    dispatch(changeDate(newDate));
    dispatch(fetchRequirementRequest({ date: newDate }));
    dispatch(fetchSlicedRequest({ date: newDate }));
  };
  useEffect(() => {
    dispatch(fetchRequirementRequest({ date }));
    dispatch(fetchSlicedRequest({ date }));
  }, []);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Typography>Error</Typography>
      ) : (
        <Paper sx={{ minHeight: "calc(100vh - 133px)", p: 2 }}>
          <div className="flex justify-between w-full mb-3">
            <Typography variant="h6" gutterBottom component="div">
              Acumulado
            </Typography>
            <div>
              <FormControl sx={{ width: "12rem", mr: 2 }} size="small">
                <InputLabel id="filtro-negativos">Maquina</InputLabel>
                <Select
                  labelId="filtro-negativos"
                  id="negativos"
                  value={machine}
                  label="Select List"
                  onChange={(e) => setMachine(e.target.value)}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="MVC 10">MVC 10</MenuItem>
                  <MenuItem value="ULMA 2">ULMA 2</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="date"
                label="Fecha"
                type="date"
                size="small"
                sx={{ ml: "auto", width: "12rem" }}
                value={date}
                onChange={(e) => handleChangeDate(e.target.value)}
              />
            </div>
          </div>
          <AccumulatedSlice data={history} />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {_.map(slicedByDate, (item) => (
              <Card
                key={item[0].fecha}
                sx={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <SlicedPlanTable pedido={item} />
              </Card>
            ))}
          </div>
        </Paper>
      )}
    </>
  );
};

export default SliceHistory;

import _ from "lodash";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { fetchRequirementRequest } from "../../../slices/requirement";
import { fetchSlicedRequest } from "../../../slices/sliced";
import { fetchSlicedOrdersRequest } from "../../../slices/slicedOrders";

const GroupFilter = ({
  setFilteredPlan,
  plan,
  date,
  handleChangeDate,
  setRealPlan,
}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [line, setLine] = useState("all");
  const [list, setList] = useState("all");

  const handleListChange = (value) => {
    switch (value) {
      case "all":
        setFilteredPlan(plan);
        break;
      case "familyN":
        setFilteredPlan(_.filter(plan, (item) => item.dif_inv_final < 0));
        break;
      case "familyC":
        setFilteredPlan(_.filter(plan, (item) => item.ajuste_carga > 0));
        break;
      default:
        setFilteredPlan(plan);
        break;
    }
    setList(value);
    setLine("all");
  };

  const handleLineChange = (value) => {
    switch (value) {
      case "all":
        setFilteredPlan(plan);
        break;
      case "Salchichas":
        setFilteredPlan(_.filter(plan, (item) => item.linea === "Salchichas"));
        break;
      case "SPA":
        setFilteredPlan(_.filter(plan, (item) => item.linea === "SPA"));
        break;
      case "Especialidades":
        setFilteredPlan(
          _.filter(plan, (item) => item.linea === "Especialidades")
        );
        break;
      case "Jamones":
        setFilteredPlan(_.filter(plan, (item) => item.linea === "Jamones"));
        break;
      case "Rebanados":
        setFilteredPlan(_.filter(plan, (item) => item.linea === "Rebanados"));
        break;
      default:
        setFilteredPlan(plan);
        break;
    }
    setLine(value);
    setList("all");
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    handleChangeDate(value);
    dispatch(fetchRequirementRequest({ date: value }));
    dispatch(fetchSlicedRequest({ date: value }));
    dispatch(fetchSlicedOrdersRequest({ date }));
    setRealPlan([]);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    if (value) {
      setFilteredPlan(
        plan.filter((item) =>
          item.producto.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    } else {
      setFilteredPlan(plan);
    }
  };

  useEffect(() => {
    if (line !== "all") {
      handleLineChange(line);
    } else if (list !== "all") {
      handleListChange(list);
    } else {
      setFilteredPlan(plan);
    }
  }, [plan]);

  return (
    <>
      <TextField
        id="product-search"
        label="Buscar Sku"
        variant="outlined"
        autoComplete="off"
        size="small"
        value={searchText}
        onChange={handleSearchChange}
        sx={{ width: "12rem", mr: 2 }}
      />
      <FormControl sx={{ width: "12rem", mr: 2 }} size="small">
        <InputLabel id="filtro-negativos">Ajustar</InputLabel>
        <Select
          labelId="filtro-negativos"
          id="negativos"
          value={list}
          label="Select List"
          onChange={(e) => handleListChange(e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="familyC">Cargas</MenuItem>
          <MenuItem value="familyN">Negativos</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "12rem" }} size="small">
        <InputLabel id="list-selector-label">Linea</InputLabel>
        <Select
          labelId="list-selector-label"
          id="list-selector"
          value={line}
          label="Select List"
          onChange={(e) => handleLineChange(e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="Salchichas">Salchichas</MenuItem>
          <MenuItem value="SPA">SPA</MenuItem>
          <MenuItem value="Especialidades">Especialidades</MenuItem>
          <MenuItem value="Jamones">Jamones</MenuItem>
          <MenuItem value="Rebanados">Rebanados</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="date"
        label="Fecha"
        type="date"
        size="small"
        value={date}
        onChange={handleDateChange}
        sx={{ ml: 2, width: "12rem" }}
      />
    </>
  );
};

export default GroupFilter;

import { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getCapacity, getLines } from "../../../selectors/capacity";

const GroupFilter = ({
  setSelectedArr,
  setShowSliced,
  showSliced,
  selectedLine,
  setSelectedLine,
  setSelectedMachine,
}) => {
  // const [searchText, setSearchText] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedSubGroup, setSelectedSubGroup] = useState();
  const [subGroupOptions, setSubGroupOptions] = useState([]);

  const data = useSelector(getCapacity);
  const lines = useSelector(getLines);

  const handleOnChangeGroup = (value) => {
    if (value === "Rebanados") {
      setShowSliced(true);
    } else {
      setSelectedGroup(value);
      setSelectedLine(value - 1);
      setShowSliced(false);
    }
  };

  const handleOnChangeSubGroup = (value) => {
    switch (value) {
      case "Parametros":
        setSelectedSubGroup(value);
        setSelectedMachine(null);
        break;
      case "MVC 10":
        setSelectedSubGroup(value);
        setSelectedMachine(1);
        break;
      case "ULMA 2":
        setSelectedSubGroup(value);
        setSelectedMachine(2);
        break;
      default:
        setSelectedSubGroup(value);
        break;
    }
  };

  // const handleSearchChange = (event) => {
  //   const { value } = event.target;
  //   setSearchText(value);

  //   if (value) {
  //     setSelectedArr(
  //       selectedArr.filter((item) =>
  //         item.sku.toLowerCase().startsWith(value.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setSelectedArr(realGroup);
  //   }
  // };

  useEffect(() => {
    if (!showSliced) {
      if (lines.length > 0) {
        setSelectedGroup(lines[selectedLine]?.idLinea);
      }
    } else {
      setSelectedGroup("Rebanados");
      setSelectedSubGroup("Parametros");
    }
  }, []);

  useEffect(() => {
    if (!showSliced && selectedGroup) {
      const values = _.values(data[selectedGroup]);
      setSelectedSubGroup(values[0][0].idMaquina);
      setSubGroupOptions(values);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      if (!showSliced && selectedSubGroup) {
        const dataCopy = _.cloneDeep(data);
        _.forEach(dataCopy[2], (arrMachine, key) => {
          dataCopy[2][key] = _.filter(arrMachine, (item) => {
            return item.barra != null && item.sku === item.barra;
          });
        });
        setSelectedArr(dataCopy[selectedGroup][selectedSubGroup]);
      } else {
        setSelectedArr(data[2][6]);
      }
    }
  }, [selectedSubGroup, data, selectedGroup, setSelectedArr, showSliced]);

  return (
    <>
      <FormControl sx={{ width: "15rem", mr: 2 }} size="small">
        <InputLabel id="filtro-linea">Linea</InputLabel>
        <Select
          labelId="filtro-linea"
          id="linea"
          value={selectedGroup || ""}
          label="Select List"
          onChange={(e) => handleOnChangeGroup(e.target.value)}
        >
          {_.map(lines, (linea) => (
            <MenuItem key={linea.idLinea} value={linea.idLinea}>
              {linea.linea}
            </MenuItem>
          ))}
          <MenuItem value="Rebanados">Rebanados</MenuItem>
        </Select>
      </FormControl>
      {showSliced ? (
        <FormControl sx={{ width: "15rem" }} size="small">
          <InputLabel id="list-selector-label">Vista</InputLabel>
          <Select
            labelId="list-selector-label"
            id="list-selector"
            value={selectedSubGroup || ""}
            label="Select List"
            onChange={(e) => handleOnChangeSubGroup(e.target.value)}
          >
            <MenuItem value="Parametros">Parametros</MenuItem>
            <MenuItem value="MVC 10">MVC 10</MenuItem>
            <MenuItem value="ULMA 2">ULMA 2</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl sx={{ width: "15rem" }} size="small">
          <InputLabel id="list-selector-label">Maquina</InputLabel>
          <Select
            labelId="list-selector-label"
            id="list-selector"
            value={selectedSubGroup || ""}
            label="Select List"
            onChange={(e) => handleOnChangeSubGroup(e.target.value)}
          >
            {_.map(subGroupOptions, (machine) => (
              <MenuItem key={machine[0].idMaquina} value={machine[0].idMaquina}>
                {machine[0].maquina}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default GroupFilter;

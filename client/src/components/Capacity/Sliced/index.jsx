import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import GroupFilter from "../GroupFilter";
import SlicedTable from "./SlicedTable";
import ParametersTable from "./ParametersTable";

const Sliced = ({
  setEditProduct,
  setOpenAlert,
  setOpenForm,
  selectedArr,
  setDeleteProduct,
  setSelectedArr,
  setShowSliced,
  showSliced,
  selectedLine,
  setSelectedLine,
  data,
}) => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [openParams, setOpenParams] = useState(false);
  const [params, setParams] = useState(null);

  const handleAddClick = () => {
    if (!selectedMachine) {
      setEditProduct(null);
      setOpenForm(true);
    } else {
      setParams(null);
      setOpenParams(true);
    }
  };

  const handleEditClick = (index) => {
    setEditProduct(index);
    setOpenForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteProduct(index);
    setOpenAlert(true);
  };

  return (
    <Box sx={{ height: "calc(100vh - 80px)" }}>
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}>
        <div className="flex justify-between w-full">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Rebanados
          </Typography>
          <div className="ml-auto flex items-center">
            <GroupFilter
              selectedArr={selectedArr}
              setSelectedArr={setSelectedArr}
              setShowSliced={setShowSliced}
              showSliced={showSliced}
              selectedLine={selectedLine}
              setSelectedLine={setSelectedLine}
              setSelectedMachine={setSelectedMachine}
            />
            <Tooltip title="Agregar sku">
              <IconButton onClick={handleAddClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {!selectedMachine ? (
          <ParametersTable
            data={data}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <SlicedTable
            params={params}
            setParams={setParams}
            selectedMachine={selectedMachine}
            setOpenParams={setOpenParams}
            openParams={openParams}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Sliced;

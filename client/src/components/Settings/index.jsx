import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import CustomTabPanel from "./CustomTabPanel";
import Projects from "./Projects";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Proyectos" {...a11yProps(0)} />
          {/* <Tab label="Usuarios" {...a11yProps(1)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Projects />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        <div>Usuarios</div>
      </CustomTabPanel> */}
    </Box>
  );
};

export default Settings;

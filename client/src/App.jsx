import { ThemeProvider } from "@mui/material/styles";
import Highcharts from "highcharts";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import moment from "moment";

import NavBar from "./components/NavBar";
import { DrawerHeader } from "./components/Drawer/materialStyled";
import { Root } from "./components/routes";
import { getTheme } from "./utilities/getTheme";
import { useSelector } from "react-redux";

Highcharts.setOptions({
  time: {
    timezone: "America/Mexico_City",
    useUTC: false,
    moment,
  },
});

const App = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <ThemeProvider theme={getTheme("light")}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {auth.isAuth && <NavBar tokenData={auth.tokenData} />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: 2,
              py: 1,
              bgcolor: "bgcolor",
              minHeight: "100vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DrawerHeader />
            <Root />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;

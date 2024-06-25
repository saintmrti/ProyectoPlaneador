import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
// import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import WeeklyInvTable from "./WeeklyInvTable"; //componente
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import { CardContent } from "@mui/material";

const steps = [
  {
    label: "",
    description: (
      <Grid container spacing={1} columns={13}>
        <Grid item xs={5}>
          <WeeklyInvTable semana={"Semana 34"} color={"DAF7A6"} extra={true} />
        </Grid>
        <Grid item xs={4}>
          <WeeklyInvTable semana={"Semana 35"} color={"D2B4DE"} />
        </Grid>
        <Grid item xs={4}>
          <WeeklyInvTable semana={"Semana 36"} color={"DAF7A6"} />
        </Grid>
      </Grid>
    ),
  },
  {
    label: "Semana 34",
    description: (
      <Grid container spacing={1} columns={13}>
        <Grid item xs={5}>
          <WeeklyInvTable semana={"Semana 37"} color={"ABEBC6"} extra={true} />
        </Grid>
        <Grid item xs={4}>
          <WeeklyInvTable semana={"Semana 38"} color={"D2B4DE"} />
        </Grid>
        <Grid item xs={4}>
          <WeeklyInvTable semana={"Semana 39"} color={"E8DAEF"} />
        </Grid>
      </Grid>
    ),
  },
  {
    label: "",
    description: (
      <Grid container spacing={1} columns={13}>
        <Grid item xs={5}>
          <WeeklyInvTable semana={"Semana 40"} color={"DAF7A6"} extra={true} />
        </Grid>
        <Grid item xs={4}>
          <WeeklyInvTable semana={"Semana 41"} color={"D2B4DE"} />
        </Grid>
        <Grid item xs={4}>
          <WeeklyInvTable semana={"Semana 42"} color={"DAF7A6"} />
        </Grid>
      </Grid>
    ),
  },
];

export default function WeeklyInventory() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Box sx={{ width: "100%", p: 1 }}>{steps[activeStep].description}</Box>
        <Button
          size="large"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ position: "absolute", top: 200, left: 0 }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>
        <Button
          size="large"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
          sx={{ position: "absolute", top: 200, right: 0 }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </Box>
    </>
  );
}

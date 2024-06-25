import { createTheme } from "@mui/material/styles";

export const getTheme = (theme) => {
  if (theme === "light")
    return createTheme({
      palette: {
        mode: "light",
        header: "#FAFAFA",
        bgcolor: "#F0F2F5",
        primary: {
          main: "#273996",
        },
        status: {
          error: "#f44336",
          warning: "#ffb428",
          info: "#0082ff",
          success: "#00b978",
          disabled: "#9E9E9E",
        },
        other: {
          yellow: "#F9A825",
        },
      },
    });
  return createTheme({
    palette: {
      mode: "dark",
      bgcolor: "#0F0D0A",
      status: {
        error: "#f44336",
        warning: "#ffb428",
        info: "#0082ff",
        success: "#00b978",
        disabled: "#9E9E9E",
      },
      other: {
        yellow: "#FDD835",
      },
    },
  });
};

// export const theme = createTheme({
//   palette: {
//     mode: "light",
//     header: "#FAFAFA",
//     bgcolor: "#F0F2F5",
//     primary: {
//       main: "#273996",
//     },
//     status: {
//       error: "#f44336",
//       warning: "#ffb428",
//       info: "#0082ff",
//       success: "#00b978",
//       disabled: "#9E9E9E",
//     },
//     other: {
//       yellow: "#F9A825",
//     },
//   },
// });

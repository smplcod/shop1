import Router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material";
// import { green, orange, purple } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFB954",
      },
      secondary: {
        main: "#000",
        // main: "#900C3F",
        // main: green[200],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;

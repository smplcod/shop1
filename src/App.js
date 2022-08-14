import Router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, orange, purple } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#fff",
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

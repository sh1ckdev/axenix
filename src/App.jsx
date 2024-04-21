import TabPanel from "./components/TabPanel";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme.jsx";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TabPanel />
    </ThemeProvider>
  );
};

export default App;

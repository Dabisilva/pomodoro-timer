import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { Router } from "./Routes";
import { CyclesProvider } from "./context/CyclesContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <BrowserRouter>
          <Router />
          <GlobalStyle />
        </BrowserRouter>
      </CyclesProvider>
    </ThemeProvider>
  );
}

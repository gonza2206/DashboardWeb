import { useState, createContext } from "react";
import { Form, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Spaces from "./scenes/Spaces";
import Calendar from "./scenes/calendar";
import { DateProvider } from "./provider/DateContext";
import Bar from "./scenes/bar";
import Line from "./scenes/Line";
import Contact from "./scenes/contact";

function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <DateProvider>{/*Paso el contexto a todas los componentes por debajo indicando la fecha del calendario*/}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/spaces" element={<Spaces />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/Bar" element={<Bar/>} />
                <Route path="/Line" element={<Line/>} />
                {/* <Route path="/Contact" element={<Contact/>} /> */}
              </Routes>

            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </DateProvider>
  );
}

export default App;

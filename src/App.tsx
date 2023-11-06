import "@mantine/core/styles.css";
import { MantineProvider, createTheme, Anchor } from "@mantine/core";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./ui/navbar";

function App() {
  const [count, setCount] = useState(0);
  const theme = createTheme({
    components: {
      Anchor: Anchor.extend({
        defaultProps: {
          underline: "never",
          color: "black",
        },
      }),
    },
  });

  return (
    <>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

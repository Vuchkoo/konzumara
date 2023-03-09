import { MantineProvider } from "@mantine/core";
import "./App.css";
import { DataProvider } from "./context/Context";
import { Navigation } from "./Navigation";

function App() {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DataProvider>
          <Navigation />
        </DataProvider>
      </MantineProvider>
    </div>
  );
}

export default App;

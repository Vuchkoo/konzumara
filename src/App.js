import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Error } from "./pages/Error";
import Home from "./pages/Home";
import UserDashboard from "./pages/user/UserDashboard";
function App() {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSignIn from "./pages/admin/AdminSignIn";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import { Error } from "./pages/Error";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={<AdminSignIn />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;

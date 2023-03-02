import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminSignIn from "./pages/admin/AdminSignIn";
import Categories from "./pages/admin/Categories";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
// import Create from "./pages/admin/CreateProduct";
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
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/products/create" element={<CreateProduct />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route
              path="admin/categories/create"
              element={<CreateCategory />}
            />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;

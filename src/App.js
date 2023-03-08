import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/Context";
import AdminSignIn from "./pages/admin/AdminSignIn";
import Categories from "./pages/admin/Categories";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import { Error } from "./pages/Error";
import Home from "./pages/Home";
import ProtectedRoute from "./utilities/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="admin" element={<AdminSignIn />} />
              <Route
                path="admin/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/products/create"
                element={
                  <ProtectedRoute>
                    <CreateProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/categories/create"
                element={
                  <ProtectedRoute>
                    <CreateCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </MantineProvider>
    </div>
  );
}

export default App;

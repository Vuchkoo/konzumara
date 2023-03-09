import Header from "../components/Header";
import { Grid, Button, Center, ScrollArea } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/Supabase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [minLoadProducts, setMinLoadProducts] = useState(0);
  const [maxLoadProducts, setMaxLoadProducts] = useState(9);
  const [productsCount, setProductsCount] = useState(null);

  const { user, loading, setLoading } = useContext(Context);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getProducts = async () => {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .range(minLoadProducts, maxLoadProducts);
    setProducts(data);
    setProductsCount(count);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [minLoadProducts, maxLoadProducts]);

  const handleAddToCart = (e, item) => {
    const itExists = cart.some((cart) => {
      return cart.id === item.id;
    });
    if (itExists) {
      setCart(
        cart?.map((cart) => {
          if (cart.id === item.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        })
      );
    } else {
      return setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (e, id) => {
    setCart([
      ...cart.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      }),
    ]);
  };

  const handleRemoveQuantity = (e, item) => {
    const itExists = cart.some((cart) => {
      return cart.id === item.id;
    });
    if (itExists) {
      setCart(
        cart.map((cart) => {
          if (cart.id === item.id && cart.quantity > 1) {
            return { ...cart, quantity: cart.quantity - 1 };
          }
          return cart;
        })
      );
    }
  };

  const onSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    // console.log(searchInput);
    // return searchInput.toLowerCase();
  };

  // const onEnter = (e) => {
  //   if (e.key === "Enter") {
  //     console.log(searchInput);
  //   }
  // };

  const handleCategory = (e, category) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const handleLoadMore = () => {
    setMaxLoadProducts((prevIndex) => prevIndex + 10);
  };

  // console.log(products);

  return (
    <div>
      <Header
        cart={cart}
        onRemove={handleRemoveFromCart}
        onAdd={handleAddToCart}
        onMinus={handleRemoveQuantity}
      />
      <div className="grid">
        <Sidebar
          products={products}
          // onEnter={onEnter}
          onChange={onSearchChange}
          onCategory={handleCategory}
        />
        <div className="product-grid">
          <Grid mt={40}>
            {products
              ?.filter((item) => {
                if (selectedCategory) {
                  return item.category_id?.includes(selectedCategory);
                }
                if (searchInput) {
                  return item.name.toLowerCase().includes(searchInput);
                }
                return item;
              })
              ?.map((item, index) => {
                return (
                  <ProductCard
                    key={index}
                    item={item}
                    onAdd={handleAddToCart}
                  />
                );
              })}
          </Grid>
          <Center mt={50}>
            {products.length < productsCount && (
              <Button color="green" onClick={handleLoadMore}>
                Load more
              </Button>
            )}
          </Center>
        </div>
      </div>
    </div>
  );
};

export default Home;

import Header from "../components/Header";
import { Grid, Button, Center } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Context } from "../context/Context";
import { supabase } from "../config/Supabase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const [minLoadProducts, setMinLoadProducts] = useState(0);
  const [maxLoadProducts, setMaxLoadProducts] = useState(9);
  const [productsCount, setProductsCount] = useState(null);

  const [minLoadCategories, setMinLoadCategories] = useState(0);
  const [maxLoadCategories, setMaxLoadCategories] = useState(9);
  const [categoriesCount, setCategoriesCount] = useState(null);

  const { setLoading } = useContext(Context);
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

  // const [items, setItems] = useState([]);

  // const getCart = () => {
  //   const items = JSON.parse(localStorage.getItem("cart"));
  //   if (items) {
  //     setItems(items);
  //     console.log(items);
  //   }
  // };
  // console.log(savedCart);

  const getCategories = async () => {
    const { data, count } = await supabase
      .from("categories")
      .select("*", { count: "exact" })
      .range(minLoadCategories, maxLoadCategories);
    setCategories(data);
    setCategoriesCount(count);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, [minLoadProducts, maxLoadProducts, minLoadCategories, maxLoadCategories]);

  // useEffect(() => {
  //   getCart();
  // }, []);

  // console.log(items);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   getCart();
  // }, [cart]);

  const handleAddToCart = (e, item) => {
    const itExists = cart.some((cart) => {
      return cart.id === item.id;
    });
    if (itExists) {
      setCart(
        cart?.map((cart) => {
          if (cart.id === item.id) {
            localStorage.setItem(`cart${cart.id}`, JSON.stringify(cart));
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        })
      );
    } else {
      localStorage.setItem(`cart${item.id}`, JSON.stringify(item));
      console.log(cart);
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
    handleSearch();
    // console.log(searchInput);
    // return searchInput.toLowerCase();
  };

  // const onEnter = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("products")
      .select()
      .like("name", searchInput);
    console.log(data);
  };

  const handleCategory = (e, category) => {
    setSelectedCategory(category);
    console.log(selectedCategory);
  };

  const handleLoadMore = () => {
    setMaxLoadProducts((prevIndex) => prevIndex + 10);
  };

  const handleLoadAllCategories = () => {
    setMaxLoadCategories((prevIndex) => prevIndex + categoriesCount);
  };

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
          categories={categories}
          categoriesCount={categoriesCount}
          loadAll={handleLoadAllCategories}
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

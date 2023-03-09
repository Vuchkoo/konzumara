import Header from "../components/Header";
import { Grid, Button, Center, ScrollArea } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Context } from "../context/Context";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const {
    products,
    setProducts,
    minloadProducts,
    setMinLoadProducts,
    maxloadProducts,
    setMaxLoadProducts,
    productsCount,
    setMaxLoadCategories,
    categoriesCount,
  } = useContext(Context);
  const [index, setIndex] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleLoadAllCategories = () => {
    setMaxLoadCategories((prevIndex) => prevIndex + categoriesCount);
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
          loadAll={handleLoadAllCategories}
          categoriesCount={categoriesCount}
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

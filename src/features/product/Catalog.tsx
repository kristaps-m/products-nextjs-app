import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product, Root } from "../../app/models/product";
import ProductList from "./ProductList";
import { useDebounce } from "use-debounce";

function debounce(func: any, delay: any) {
  let timer: any;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function Catalog() {
  // const [products, setProducts] = useState<Root>({
  //   products: [],
  // });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state
  // DEBOUNCE
  const [text, setText] = useState("Hello");
  const [value] = useDebounce(text, 1000);

  // const handleSearch = (searchTerm: string) => {
  //   //console.log(searchTerm);
  //   //searchTerm = "apple";
  //   // Fetch all products (or use a cached copy if available)
  //   agent.Catalog.list()
  //     .then((allProducts) => {
  //       // Filter products based on the search term
  //       const filteredProducts = allProducts.products.filter(
  //         (product: Product) =>
  //           product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       // console.log(filteredProducts, "these are filteredProducts");
  //       setProducts(filteredProducts); // {products: filteredProducts}
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // };

  // const debouncedSearch = debounce(handleSearch, 300);

  // useEffect(() => {
  //   setLoading(true); // Show loading indicator
  //   debouncedSearch(searchTerm); // Trigger the search after a delay when the user stops typing
  // }, [debouncedSearch, searchTerm]);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => {
        const filteredProducts = products.products.filter(
          (product: Product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) // searchTerm
        );
        console.log(filteredProducts, "these are filteredProducts");
        setProducts(filteredProducts);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [value]); // searchTerm - Add [] dependency to prevent infinite loop. And call 'useEffect' method once!!!!!!

  // useEffect(() => {
  //   agent.Catalog.list()
  //     .then((products) => {
  //       const filteredProducts = products.products.filter((product: Product) =>
  //         product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       console.log(filteredProducts, "these are filteredProducts");
  //       setProducts(filteredProducts);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, [searchTerm]); // Add [] dependency to prevent infinite loop. And call 'useEffect' method once!!!!!!

  // if (loading) return <h1>Loading products....</h1>;

  return (
    <>
      <h3>This is Catalog.tsx</h3>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
      />
      <p>
        -------------Below this line ProductList is beeing rendered
        --------------------
      </p>
      <div>
        <h2>This is Div for debounce TOP</h2>
        <input
          defaultValue={"Hello"}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <p>Actual value: {text}</p>
        <p>Debounce value: {value}</p>
        <h2>This is Div for debounce BOTTOM</h2>
      </div>
      <ProductList products={products} />
    </>
  );
}

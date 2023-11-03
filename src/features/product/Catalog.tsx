import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product, Root } from "../../app/models/product";
import ProductList from "./ProductList";

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

  const handleSearch = (searchTerm: string) => {
    //console.log(searchTerm);
    //searchTerm = "apple";
    // Fetch all products (or use a cached copy if available)
    agent.Catalog.list()
      .then((allProducts) => {
        // Filter products based on the search term
        const filteredProducts = allProducts.products.filter(
          (product: Product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // console.log(filteredProducts, "these are filteredProducts");
        setProducts(filteredProducts); // {products: filteredProducts}
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(() => {
    setLoading(true); // Show loading indicator
    debouncedSearch(searchTerm); // Trigger the search after a delay when the user stops typing
  }, [debouncedSearch, searchTerm]);

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
      <ProductList products={products} />
    </>
  );
}

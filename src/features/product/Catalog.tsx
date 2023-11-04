import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useDebounce } from "use-debounce";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // DEBOUNCE
  const [text, setText] = useState("");
  const [searchTerm] = useDebounce(text, 2000);
  const handleReset = () => {
    setText("");
  };

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => {
        const filteredProducts = products.products.filter((product: Product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(filteredProducts, "these are filteredProducts");
        setProducts(filteredProducts);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <>
      <h3>This is Catalog.tsx</h3>
      <div>
        <input
          type="text"
          value={text}
          placeholder="Search products..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={handleReset}>Reset</button>
        {/* <h2>uncomment this for searchterm testing</h2>
        <p>Actual value: {text}</p>
        <p>Debounce value: {searchTerm}</p> */}
      </div>
      {loading ? <h1>Loading...</h1> : <ProductList products={products} />}
    </>
  );
}

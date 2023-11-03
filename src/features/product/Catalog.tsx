import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";
import { Root } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Root>({
    products: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []); // Add [] dependency to prevent infinite loop. And call 'useEffect' method once!!!!!!

  // if (loading) return <LoadingComponent message="Loading products...." />;

  return (
    <>
      <h3>This is Catalog.tsx</h3>
      <p>
        -------------Below this line ProductList is beeing rendered
        --------------------
      </p>
      <ProductList products={products.products} />
    </>
  );
}

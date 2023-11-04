import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "../src/app/models/product";
import agent from "../src/app/api/agent";

const productDetailsStyle = {
  width: "50%",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query; // Access the product ID from the route parameter
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      agent.Catalog.details(Number(productId))
        .then((data) => setProduct(data.products))
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      agent.Catalog.details(Number(productId))
        .then((data) => {
          const idToFind = Number(productId);
          const foundProduct = data.products.find(
            (p: Product) => p.id === idToFind
          );
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            console.error("No product data found.");
          }
        })
        .catch((error) => console.error("Error fetching product data:", error))
        .finally(() => {
          setLoading(false); // Set loading state to false when data is fetched
        });
    }
  }, [productId]);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div style={productDetailsStyle}>
            <h3>{product.name}</h3>
            <p>
              Price: {product.price} {product.currency}
            </p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
          </div>
        ) : (
          <p>No product found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

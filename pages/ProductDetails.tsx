import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "../src/app/models/product";
import agent from "../src/app/api/agent";
import { NavigationButtons } from "@/app/NavigationButtons";
import "./../src/app/globals.css";

const productDetailsStyle = {
  width: "50%",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const textSizeSytle = {
  fontSize: "3rem",
};

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query; // Access the product ID from the route parameter
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

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
      <NavigationButtons />
      <div className="flex justify-center items-center min-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <div style={productDetailsStyle}>
            <h1 style={textSizeSytle}>{product.name}</h1>
            <img
              src={`https://picsum.photos/id/${product.id + 10}/400/300`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2>
              Price: {product.price} {product.currency}
            </h2>
            <h2>Category: {product.category}</h2>
            <h2>Description: {product.description}</h2>
          </div>
        ) : (
          <p>No product found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

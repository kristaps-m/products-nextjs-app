// pages/products.tsx
import Catalog from "../src/features/product/Catalog";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Products Catalog</h1>
      <Catalog />
    </div>
  );
};

export default ProductsPage;

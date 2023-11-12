import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import Pagination, { paginate } from "../../component/Pagination";
import { useDebounce } from "use-debounce";

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // DEBOUNCE
  const [text, setText] = useState("");
  const [searchTerm] = useDebounce(text, 2000); // 2 seconds
  const handleReset = () => {
    setText("");
  };

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => {
        const filteredProducts = products.products.filter((product: Product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProducts(filteredProducts);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const paginatedPosts: Product[] = paginate(products, currentPage, pageSize);

  return (
    <div data-testid="productList-1">
      <div className="flex justify-center">
        <input
          type="text"
          value={text}
          placeholder="Search products..."
          onChange={(e) => {
            setText(e.target.value);
            setCurrentPage(1); // Reset currentPage to 1 when searching
          }}
          className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleReset}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reset
        </button>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {paginatedPosts.map((product) => (
            <div
              key={product.id}
              className="hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      <br />
      <Pagination
        items={products.length}
        currentPage={currentPage} // 1
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}

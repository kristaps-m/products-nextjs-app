import ProductList from "./ProductList";
import { NavigationButtons } from "@/app/NavigationButtons";

export default function Catalog() {
  return (
    <div data-testid="catalog-1">
      <NavigationButtons />
      <div className="flex justify-center">
        <ProductList />
      </div>
    </div>
  );
}

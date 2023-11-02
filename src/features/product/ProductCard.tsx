import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
//import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
// import { useAppDispatch } from "../../app/store/configureStore";
// import { currencyFormat } from "../../app/util/util";
// import { setBasket } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  // const dispatch = useAppDispatch();
  //const {setBasket} = useStoreContext();

  // function handleAddItem(productId: number) {
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket))) // setBasket(basket)
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }

  return (
    <div style={{ border: "1px solid red" }}>
      <h3>
        The name:
        {product.name}
      </h3>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      {/* <button component={Link} to={`products/${product.id}`} size="small">
        View
      </button> */}
      <a href={`/products/${product.id}`}>
        <button className="button-style">View</button>
      </a>
    </div>
  );
}

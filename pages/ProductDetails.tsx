// pages/ProductDetails.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { Product, Root } from "../src/app/models/product";
import agent from "../src/app/api/agent";
import { useParams } from "next/navigation";

const productDetailsStyle = {
  width: "50%",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const backLinkStyle = {
  display: "block",
  marginTop: "20px",
  textDecoration: "none",
  color: "blue",
};

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query; // Access the product ID from the route parameter
  const [product, setProduct] = useState<Product | null>(null); // Root
  // const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

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

/**

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRouter } from "next/router";
import agent from "../src/app/api/agent";
//import { useStoreContext } from "../../app/context/StoreContext";
// import NotFound from "../../app/errors/NotFound";
// import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../src/app/models/product";
import Link from "next/link";
// import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
// import { removeItem, setBasket } from "../basket/basketSlice";

// interface Props {
//   product: Product;
// }
// { product }: Props
export default function ProductDetails() {
  const router = useRouter();
  const { productId } = router.query; // Access the product ID from the route parameter

  // const { basket } = useAppSelector((state) => state.basket); //, setBasket, removeItem} = useStoreContext();
  // const dispatch = useAppDispatch();

  // const { id } = useParams<{ id: string }>();

  // const [product, setProduct] = useState<Product | null>(null);

  // const [loading, setLoading] = useState(true);
  // const [quantity, setQuantity] = useState(0);
  // const [submitting, setSubmitting] = useState(false);

  // const item = basket?.items.find((item) => item.productId === product?.id);

  // useEffect(() => {
  //   if (item) setQuantity(item.quantity);
  //   agent.Catalog.details(parseInt(id))
  //     .then((response) => setProduct(response))
  //     .catch((error) => console.log(error.response))
  //     .finally(() => setLoading(false));
  // }, [id, item]);

  // function handleInputChange(event: any) {
  //   if (event.target.value >= 0) {
  //     setQuantity(parseInt(event.target.value));
  //   }
  // }

  // function handleUpdateCart() {
  //   setSubmitting(true);
  //   if (!item || quantity > item.quantity) {
  //     const updatedQuantity = item ? quantity - item.quantity : quantity;
  //     agent.Basket.addItem(product?.id!, updatedQuantity)
  //       .then((basket) => dispatch(setBasket(basket))) // setBasket(basket)
  //       .catch((error) => console.log(error))
  //       .finally(() => setSubmitting(false));
  //   } else {
  //     const updatedQuantity = item.quantity - quantity;
  //     agent.Basket.removeItem(product?.id!, updatedQuantity)
  //       .then(() =>
  //         dispatch(
  //           removeItem({ productId: product?.id!, quantity: updatedQuantity })
  //         )
  //       ) // removeItem(product?.id!, updatedQuantity))
  //       .catch((error) => console.log(error))
  //       .finally(() => setSubmitting(false));
  //   }
  // }

  // if (loading) return <LoadingComponent message="Loading product..." />;

  // if (!product) return <NotFound />;

  const productDetailsStyle = {
    width: "50%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const backLinkStyle = {
    display: "block",
    marginTop: "20px",
    textDecoration: "none",
    color: "blue",
  };

  return (
    <div style={productDetailsStyle}>
      <h1>{product.name}</h1>
      <p>
        Price: {product.price} {product.currency}
      </p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      { <Link href="/products">
        <a style={backLinkStyle}>Back to Catalog</a>
      </Link> }
      <Link href="/products/[productId]" as={`/products/${product.id}`}>
        <a>View Product</a>
      </Link>
    </div>

    // <Grid container spacing={6}>
    //   <Grid item xs={6}>
    //     <img
    //       src={product.pictureUrl}
    //       alt={product.name}
    //       style={{ width: "100%" }}
    //     />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Typography variant="h3">{product.name}</Typography>
    //     <Divider sx={{ mb: 2 }} />
    //     <Typography variant="h4" color="secondary">
    //       ${(product.price / 100).toFixed(2)}
    //     </Typography>
    //     <TableContainer>
    //       <Table>
    //         <TableBody>
    //           <TableRow>
    //             <TableCell>Name</TableCell>
    //             <TableCell>{product.name}</TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell>Description</TableCell>
    //             <TableCell>{product.description}</TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell>Type</TableCell>
    //             <TableCell>{product.type}</TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell>Brand</TableCell>
    //             <TableCell>{product.brand}</TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell>Quantity in stock</TableCell>
    //             <TableCell>{product.quantityInStock}</TableCell>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //     <Grid container spacing={2}>
    //       <Grid item xs={6}>
    //         <TextField
    //           variant="outlined"
    //           type="number"
    //           label="Quantity in Cart"
    //           fullWidth
    //           value={quantity}
    //           onChange={handleInputChange}
    //         />
    //       </Grid>
    //       <Grid item xs={6}>
    //         <LoadingButton
    //           disabled={
    //             item?.quantity === quantity || (!item && quantity === 0)
    //           }
    //           loading={submitting}
    //           onClick={handleUpdateCart}
    //           sx={{ height: "55px" }}
    //           color="primary"
    //           size="large"
    //           variant="contained"
    //           fullWidth
    //         >
    //           {item ? "Update quantity" : "Add to cart"}
    //         </LoadingButton>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}



*/

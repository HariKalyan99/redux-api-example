import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./productsSlice";
import styles from "./Products.module.css";
import { addAsync } from "../cart/cartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAsync())}
        >
          fetch products
        </button>
       {products.map((item) => <div key={item.id} className={styles.card}>
          <img src={item.thumbnail} alt="Denim Jeans" style={{ width: "100%" }} />
          <h1>{item.title}</h1>
          <p className={styles.price}>Rs.{item.price}</p>
          <p>{item.description}</p>
          <p>
            <button onClick={() => dispatch(addAsync(item))}>Add to Cart</button>
          </p>
        </div>)}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delAsync, fetchAsync, updateAsync } from "./cartSlice";
import styles from "./Cart.module.css";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items)


  useEffect(() => {
    dispatch(fetchAsync())
  }, [])

  const handleChange = (e, id) => {
    dispatch(updateAsync({id, change: {quantity: e.target.value}}))
  }

  return (
    <div>
      <div>
       {items.map((item) => 
       <div key={item.id} className={styles["cart-item"]}>
       <img src={item.thumbnail} alt={item.title} className={styles["img-fluid"]} />
       <div className={styles.description}>
       <p>{item.title}</p>
       <span>{item.brand}</span>
       <strong>${item.price}</strong>
       </div>
       <div className={styles.quantity}>
       Quantity
       <select value={item.quantity} onChange={(e) => handleChange(e, item.id)}>
     <option value={1}>1</option>
     <option value={2}>2</option>
     <option value={3}>3</option>
       </select>
       <div className={styles.close}>
         <button onClick={() => dispatch(delAsync(item.id))}>
           X
         </button>
       </div>
       </div>
       </div>
      )}
      
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  incrementCartItemQty,
  decrementCartItemQty,
  removeItemFromCart,
} from "../features/products/productSlice";
import {
  CartPageContainer,
  CartPageWrapper,
  CartPageItem,
  CartPageItemImage,
  CartPageItemName,
  CartPageItemPrice,
  CartPageItemRemoveButton,
  CartPageItemSummary,
  CartPageItemSummaryHeader,
  CartPageItemPriceTotal,
  CartPageItemButton,
  CartItemQtyContainer,
  CartItemDecrementBtn,
  CartItemQty,
  CartItemIncrementBtn,
  GoHomeButton
} from "../components/styles";

function Cart() {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const currencySymbol = useSelector((state) => state.products.currencySymbol);

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currencySymbol));
  }, [currencySymbol]);

  const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total")));

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("total", JSON.stringify(total));
  }, [total]);

  function itemPrice(p) {
    let price = 1;
    if (currencySymbol === "£") {
      price = p * 0.79;
    } else if (currencySymbol === "₦") {
      price = p * 415.2;
    } else if (currencySymbol === "¥") {
      price = p * 129.23;
    } else {
      return (price = p);
    }

    return price.toLocaleString();
  }

  return (
    <CartPageContainer>
      {cart.length < 1 && (
        <h1 style={{ padding: "5em" }}>Your cart is empty</h1>
      )}
      <CartPageWrapper>
        {cart.map((item) => (
          <CartPageItem key={item.id}>
            <CartPageItemImage src={item.img} alt={item.name} />
            <CartPageItemName>{item.name}</CartPageItemName>
            <CartPageItemPrice>
              {currencySymbol.length > 0 ? currencySymbol : "$"}
              {itemPrice(item.price)}
            </CartPageItemPrice>

            <CartItemQtyContainer>
              <CartItemDecrementBtn
                onClick={() => dispatch(decrementCartItemQty(item))}
              >
                -
              </CartItemDecrementBtn>
              <CartItemQty>{item.qty}</CartItemQty>
              <CartItemIncrementBtn
                onClick={() => dispatch(incrementCartItemQty(item))}
              >
                +
              </CartItemIncrementBtn>
            </CartItemQtyContainer>

            <CartPageItemRemoveButton
              onClick={() => dispatch(removeItemFromCart(item))}
            >
              <AiIcons.AiFillDelete style={{ fontSize: "1.5rem" }} />
            </CartPageItemRemoveButton>
          </CartPageItem>
        ))}
        <CartPageItemSummary>
          <CartPageItemSummaryHeader>
            Subtotal ({cart.length}) {cart.length > 1 ? "items" : "item"}
          </CartPageItemSummaryHeader>
          <CartPageItemPriceTotal>
            Total: {currencySymbol.length > 0 ? currencySymbol : "$"}
            {itemPrice(total)}
          </CartPageItemPriceTotal>
          <CartPageItemButton
            style={{ display: "block" }}
            disabled={cart.length === 0}
          >
            Proceed to CheckOut
          </CartPageItemButton>
        </CartPageItemSummary>
      </CartPageWrapper>
      <GoHomeButton>
        <Link to="/pdp">Go Back</Link>
      </GoHomeButton>
    </CartPageContainer>
  );
}

export default Cart;

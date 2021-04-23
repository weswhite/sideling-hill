import { useState, createContext, useContext, useEffect } from "react";
import { initiateCheckout } from "../lib/payments";
import { getStorageItem, setStorageItem } from "../lib/storage";
import products from "../products.json";

const CART_STATE_KEY = "cart";

interface Cart {
  products: any;
}

interface CartItems {
  quantity: number;
  pricePerUnit: number;
  id: string;
}

const defaultCart = {
  products: {},
};

const initialCart = {
  cart: null,
  cartItems: null,
  subtotal: null,
  quantity: null,
  addToCart: (item: any) => {},
  checkout: () => {},
  updateItem: (item: any) => {},
};

export const CartContext = createContext(initialCart);

export function useCartState() {
  const [cart, updateCart] = useState<Cart>(defaultCart);

  useEffect(() => {
    const data = getStorageItem(CART_STATE_KEY);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    setStorageItem(CART_STATE_KEY, cart);
  }, [cart]);

  const cartItems: CartItems[] = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerUnit: product.price,
    };
  });

  const subtotal: number = cartItems.reduce(
    (accumulator, { pricePerUnit, quantity }) => {
      return accumulator + pricePerUnit * quantity;
    },
    0
  );

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  function addToCart({ id }) {
    updateCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cart;
    });
  }

  function checkout() {
    console.log(process.env);
    initiateCheckout({
      lineItems: cartItems.map(({ id, quantity }) => {
        return {
          price: id,
          quantity,
        };
      }),
    });
  }

  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = quantity;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cart;
    });
  }

  return {
    cart,
    cartItems,
    subtotal,
    quantity,
    addToCart,
    checkout,
    updateItem,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}

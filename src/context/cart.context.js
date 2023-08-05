import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //checksfor existing cart item 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //increment cart Item  and add product to cart 
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    // General case when first item added to cart 
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}




export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    // Cart Count 
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0)
        setCartCount(newCartCount)
    }, [cartItems])
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}


import { createContext, type ReactNode, useContext, useState } from "react";
import { getProductById, type Product } from "../data/Products";

export type CartElement = {
    cartProduct: Product;
    cartQuantity: number;
};

type CartContextType = {
    cartItems: CartElement[];
    addToCart: (product: Product) => void;
    getCartItemsWithProduct: () => CartElement[];
    updateQuantity: (productId: number, quantity: number) => void;
    getTotal: () => number;
    removeFromCart: (productId: number) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
    children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartElement[]>([]);

    const addToCart = (product: Product) => {
        const exist = cartItems.find(
            (item) => item.cartProduct.id === product.id
        );

        if (exist) {
            const currentQuantity = exist.cartQuantity;
            const updateCartItems = cartItems.map((item) =>
                item.cartProduct.id === product.id
                    ? { cartProduct: product, cartQuantity: currentQuantity + 1 }
                    : item
            );
            setCartItems(updateCartItems);
        } else {
            const newCartItem: CartElement = {
                cartProduct: product,
                cartQuantity: 1,
            };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    function getCartItemsWithProduct(): CartElement[] {
        return cartItems
            .map((item) => {
                const product = getProductById(item.cartProduct.id);
                return product ? { ...item, cartProduct: product } : null;
            })
            .filter((item): item is CartElement => item !== null);
    }

    function updateQuantity(productId: number, quantity: number) {
        if (quantity > 0) {
            setCartItems(
                cartItems.map((item) =>
                    item.cartProduct.id === productId
                        ? { ...item, cartQuantity: quantity }
                        : item
                )
            );
        }
    }

    function getTotal() {
        return cartItems.reduce(
            (sum, item) => sum + item.cartProduct.price * item.cartQuantity,
            0
        );
    }

    const removeFromCart = (productId: number) => {
        setCartItems(
            cartItems.filter((item) => item.cartProduct.id !== productId)
        );
    };

    const clear = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                getCartItemsWithProduct,
                updateQuantity,
                removeFromCart,
                getTotal,
                clear,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return ctx;
}
import {Link} from "react-router-dom";
import type {Product} from "../data/Products.ts";
import {type CartElement, useCart} from "../context/CartContext.tsx";

type ProductCardProps = {
    product: Product;
};

function ProductCardComponent({product}: ProductCardProps) {
    const {addToCart, cartItems} = useCart();
    // ✅ Trova il prodotto nel carrello
    const productInCart = cartItems.find(
        (item: CartElement) => item.cartProduct.id === product.id
    );

    // ✅ Se esiste, mostra la quantità
    const productQuantityLabel = productInCart
        ? `(${productInCart.cartQuantity})`
        : "";

    return (
        <>
            <div key={product.id} className={"product-card"}>
                <img src={product.image} className={"product-card-image"}/>
                <div className={"product-card-content"}>
                    <h3 className={"product-card-name"}>{product.name}</h3>
                    <p className={"product-card-price"}>{product.price}</p>
                    <div className={"product-card-actions"}>
                        <Link to={`/product/${product.id}`} className={"btn btn-secondary"}>View details</Link>
                        <button className={"btn btn-primary"} onClick={() => addToCart(product)}>Add to cart {productQuantityLabel}</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCardComponent;
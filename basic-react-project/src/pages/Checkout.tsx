import {useCart} from "../context/CartContext.tsx";

function Checkout() {
    const {getCartItemsWithProduct, updateQuantity, removeFromCart, getTotal, clear} = useCart();
    const cartItems = getCartItemsWithProduct();
    const total = getTotal();
    function placeOrder(): void {
        clear();
    }
    return (
        <>
            <div className={"page"}>
                <div className={"container"}>
                    <h1 className={"page-title"}>checkout</h1>
                    <div className={"checkout-container"}>
                        <div className={"checkout-items"}>
                            <h2 className="checkout-section-title">Order Summary</h2>
                            {cartItems.map((item) => (
                                <div className="checkout-item" key={item.cartProduct.id}>
                                    <img
                                        src={item.cartProduct.image}
                                        alt={item.cartProduct.name}
                                        className="checkout-item-image"
                                    />
                                    <div className="checkout-item-details">
                                        <h3 className="checkout-item-name">{item.cartProduct.name}</h3>
                                        <p className="checkout-item-price">
                                            ${item.cartProduct.price} each
                                        </p>
                                    </div>
                                    <div className="checkout-item-controls">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.cartProduct.id, item.cartQuantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-value">{item.cartQuantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.cartProduct.id, item.cartQuantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="checkout-item-total">
                                            ${(item.cartProduct.price * item.cartQuantity).toFixed(2)}
                                        </p>
                                        <button
                                            className="btn btn-secondary btn-small"
                                            onClick={() => removeFromCart(item.cartProduct.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-summary">
                            <h2 className="checkout-section-title">Total</h2>
                            <div className="checkout-total">
                                <p className="checkout-total-label">Subtotal:</p>
                                <p className="checkout-total-value">${total.toFixed(2)}</p>
                            </div>
                            <div className="checkout-total">
                                <p className="checkout-total-label">Total:</p>
                                <p className="checkout-total-value checkout-total-final">
                                    ${total.toFixed(2)}
                                </p>
                            </div>
                            <button
                                className="btn btn-primary btn-large btn-block"
                                onClick={placeOrder}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
import { getProducts } from "../data/Products.ts";
import ProductCardComponent from "../components/ProductCardComponent.tsx";

function HomePage() {
    const products = getProducts();
    return (
        <>
            <div className={"page"}>
                <div className={"home-hero"}>
                    <h1 className={"home-title"}>
                        Welcome to ShopHub
                    </h1>
                    <p className={"home-subtitle"}>
                        Discover amazing products at grat prices
                    </p>
                </div>
                <div className={"container"}>
                    <h2 className={"page-title"}>
                        Our products
                    </h2>
                    <div className={"product-grid"}>
                        {
                            products.map(
                            (product) =>
                                <ProductCardComponent product={product} key={product.id} />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
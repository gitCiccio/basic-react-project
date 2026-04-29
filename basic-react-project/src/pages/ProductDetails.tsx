import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, type Product } from "../data/Products";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/");
            return;
        }

        const productFound = getProductById(Number(id));

        if (!productFound) {
            navigate("/");
            return;
        }

        setProduct(productFound);
    }, [id, navigate]);

    if (!product) {
        return (
            <div className="page">
                <div className="container">
                    <p>Loading product...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container">
                <div className="product-detail-image">
                    <img
                        src={product.image}
                        alt={`Image of product ${product.name}`}
                    />
                </div>
                <div className="product-detail">
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-description">{product.description}</p>
                    <p className="product-detail-price">${product.price}</p>
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
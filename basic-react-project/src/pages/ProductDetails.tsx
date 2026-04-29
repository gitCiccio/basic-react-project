import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById, type Product} from "../data/Products.ts";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        // Se non c'è l'id nel URL, torna alla home
        if (!id) {
            navigate("/");
            return;
        }

        // Cerca il prodotto usando l'id dal URL
        const productFound = getProductById(Number(id));

        // Se non lo trovi, torna alla home
        if (!productFound) {
            navigate("/");
            return;
        }

        // Altrimenti salvalo nello stato
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProduct(productFound);
    }, [id, navigate]); // Dipendenze corrette

    // Mentre carica, mostra un messaggio
    if (!product) {
        return <div>Caricamento...</div>;
    }

    return (
        <>
            <div className={"page"}>ù
                <div className={"container"}>
                    <div className={"product-detail-image"}>
                        <img src={product?.image} alt={`Image of product ${product?.name}`}/>
                    </div>
                    <div className={"product-detail"}>
                        <h1 className={"product-detail-name"}>{product?.name}</h1>
                        <p className={"product-detail-description"}>{product?.description}</p>
                        <p className={"product-detail-price"}>{product?.price}</p>
                        <p>{product?.description}</p>
                        <button className={"btn btn-primary"}>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
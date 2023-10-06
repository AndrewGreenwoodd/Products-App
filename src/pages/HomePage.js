import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Product from "../components/Product";
import styles from '../components/Products.module.css'
import NewProduct from "../components/NewProduct";
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../store';


const HomePage = () => {
    const dispatch = useDispatch();
    const addNewProductHandler = () => {
        dispatch(productActions.toggleModal());
    }
    const { products } = useLoaderData();
    const isAddingNewProduct = useSelector((state) => state.product.showModal);
    return (
        <>
            <div className={styles.productsWrapper}>
                {isAddingNewProduct && <NewProduct />}
                <h1 className={styles.productHeading}>Our Products</h1>
                <button className={styles.button} onClick={addNewProductHandler}>Add New Product </button>
                <div className={styles.products}>
                    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading</p>}>
                        <Await resolve={products}>{(loadedProducts) => <Product products={loadedProducts} />}</Await>
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default HomePage



async function loadProducts() {
    const response = await fetch('https://inforce-products-default-rtdb.europe-west1.firebasedatabase.app/products.json');
    if (!response.ok) {
        throw json({ message: `Can't load products` }, { status: 500 });
    } else {
        const responseData = await response.json();
        return responseData;
    }
}

export async function loader() {
    return defer({
        products: loadProducts()
    })
}

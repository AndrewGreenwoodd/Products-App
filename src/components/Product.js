import { Link } from 'react-router-dom';
import styles from './Products.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../store';
import { useEffect } from 'react';
import EditProduct from './EditProduct';
import DeleteConfirmationModal from './DeleteProduct';

const Product = (props) => {
    const dispatch = useDispatch();
    const { products } = props;
    const dataArray = Object.values(products);
    const productToDelete = useSelector((state) => state.product.productToDelete);
    const showConfirmationModal = useSelector((state) => state.product.showConfirmationModal);

    const deleteProductHandler = (product) => {
        dispatch(productActions.setProductToDelete(product));
    };

    const editProductHandler = () => {
        dispatch(productActions.editProduct());
    }

    const isEditingProduct = useSelector((state) => state.product.showEditModal);
    useEffect(() => {
        dispatch(productActions.generateProductId(dataArray.length));
    }, [dataArray, dispatch])

    const confirmDeleteHandler = async () => {
        try {
            console.log(productToDelete.id);
            const response = await fetch('https://inforce-products-default-rtdb.europe-west1.firebasedatabase.app/products/product-' + productToDelete.id + '.json', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete product with ID ${productToDelete.id}`);
            }

            dispatch(productActions.clearProductToDelete());
        } catch (error) {
            console.error(error);
        }
    };

    const cancelDeleteHandler = () => {
        dispatch(productActions.clearProductToDelete());
    };


    return (<>
        {isEditingProduct && <EditProduct />}
        {dataArray.map((product) => (
            <div className={styles.productItem} key={product.id}>
                <Link to={`product-${product.id}`}>
                    <div className={styles.productImage} style={{ backgroundImage: `url(${product.imageUrl})` }}>
                        <p className={styles.productImageDescription}>Product details</p>
                    </div>
                </Link>
                <div className={styles.productBody}>
                    <div className={styles.productTitle}><p><strong>{product.name}</strong></p></div>
                </div>
                <div className={styles.actions}>
                    <button type="button" className={styles.productButton} onClick={() => deleteProductHandler(product)}>Delete</button>
                    <button type="button" className={styles.productButton} onClick={editProductHandler}>Modify</button>
                </div>
            </div>

        ))}
        {showConfirmationModal && (
            <DeleteConfirmationModal
                message={`Are you sure you want to delete this product?`}
                onConfirm={confirmDeleteHandler}
                onCancel={cancelDeleteHandler}
            />)}
    </>
    )
}

export default Product
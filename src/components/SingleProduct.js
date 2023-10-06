import styles from './SingleProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../store';
import DeleteConfirmationModal from './DeleteProduct';
import EditProduct from './EditProduct';

const SingleProduct = (props) =>{
    const {product} = props;
    const dispatch = useDispatch();
    const deleteProductHandler = (product) => {
        dispatch(productActions.setProductToDelete(product));
    };
    const showConfirmationModal = useSelector((state) => state.product.showConfirmationModal);
    const isEditingProduct = useSelector((state) => state.product.showEditModal);
    const productToDelete = useSelector((state) => state.product.productToDelete);
    const editProductHandler = () => {
        dispatch(productActions.editProduct());
    }
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

    return ( <>
            <div className={styles.productItem} key={product.id}>
                <div className={styles.productImage}>
                    <img src={product.imageUrl} alt="product" />
                  </div>
            <div className={styles.productBody}>
                <div className={styles.productTitle}><p><strong>{product.name}</strong></p></div>
                <div className={styles.actions}>
                    <button type="button" className={styles.productButton} onClick={() => deleteProductHandler(product)}>Delete</button>
                    <button type="button" className={styles.productButton} onClick={editProductHandler}>Modify</button>
                </div>
            </div>
            {showConfirmationModal && (
            <DeleteConfirmationModal
                message={`Are you sure you want to delete this product?`}
                onConfirm={confirmDeleteHandler}
                onCancel={cancelDeleteHandler}
            />)}
              {isEditingProduct && <EditProduct />}
        </div> 
       </>
    )
}

export default SingleProduct

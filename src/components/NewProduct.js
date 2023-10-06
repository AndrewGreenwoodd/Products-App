import Modal from '../components/Modal';
import styles from './NewProduct.module.css';
import { Form, redirect, json } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../store';

function NewProduct() {
  const productID = useSelector((state) => state.product.quantity);
  const dispatch = useDispatch();
    const toggleProductHandler = () => {
        dispatch(productActions.toggleModal());
        }

  const modalContent = <Form method='post' className={styles.form} >
    <p>
      <label htmlFor="name">Product Name</label>
      <input type="text" id="name" required name="name" />
    </p>
    <p>
      <label htmlFor="imageUrl">Product image url</label>
      <input type="text" id="imageUrl" required name="imageUrl" />
    </p>
    <p>
    <label htmlFor="weight">Product weight</label>
      <input type="number" id="weight" required name="weight" />
    </p>
    <p>
    <label htmlFor="height">Product height</label>
      <input type="number" id="height" required name="height" />
      <label htmlFor="width">Product width</label>
      <input type="number" id="width" required name="width" />
    </p>
    <input type="number" id="id" readOnly hidden value={productID + 1} style={{display:'none'}} name="id"/>
    <p className={styles.actions}>
      <button type="button" onClick={toggleProductHandler}>Cancel</button>
      <button>Submit</button>
    </p>
  </Form>


  return (
    <Modal onClose={toggleProductHandler}>
      {modalContent}
      
    </Modal>
  );
}

export async function action(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData); 
  const customKey = `product-${postData.id}`
  console.log(customKey);
  const response = await fetch(`https://inforce-products-default-rtdb.europe-west1.firebasedatabase.app/products/${customKey}.json`, {             
    method: 'PUT',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  );
  if(!response.ok){
    throw json({message:`Can't add product`}, {status:500});
  }
  return redirect('/');
}

export default NewProduct;
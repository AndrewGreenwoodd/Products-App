import {useLoaderData, Await, json, defer } from "react-router-dom";
import { Suspense } from "react";
import SingleProduct from '../components/SingleProduct'

const SomeProductPage = () => {
  const {product} = useLoaderData()
 return (
 <>
 <Suspense fallback={<p style={{textAlign:'center'}}>Loading</p>}>
 <Await resolve={product}>
    {loadedProduct => <SingleProduct product={loadedProduct} />}
 </Await>
 </Suspense>
 </>
 )
}

async function loadProduct(id){
    const response = await fetch('https://inforce-products-default-rtdb.europe-west1.firebasedatabase.app/products/' + id + '.json');
    if(!response.ok){
     throw json({message: 'Could not fetch a data for this event'},{status:500});
    }
    else {
        const resData = await response.json();
        return resData
    }
}

export async function loader({request,params}){
    const id = params.productId;              
   return defer ({
     product: await loadProduct(id),       
   })
 }

export default SomeProductPage;

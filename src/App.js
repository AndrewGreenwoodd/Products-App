import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage, { loader as productsLoader } from './pages/HomePage';
import SomeProductPage, { loader as productLoader } from './pages/SomeProductPage';
import {action as addNewProductAction} from './components/NewProduct'

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path:'/', element: <HomePage /> ,loader:productsLoader, action: addNewProductAction },
      { path: '/:productId', element: <SomeProductPage />, loader:productLoader },
     
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

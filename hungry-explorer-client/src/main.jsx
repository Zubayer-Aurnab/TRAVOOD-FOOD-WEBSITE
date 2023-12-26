import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import AllFood from './pages/AllFood';
import Error from './pages/Error';
import SingleFood from './pages/SingleFood';
import Login from './pages/Login';
import AuthProvider from './Context/AuthProvider';
import Register from './pages/Register';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import MyFood from './pages/MyFood';
import Update from './pages/Update';
import Private from './Hooks/Private';
import Payment from './pages/Payment/Payment';
import Stat from './pages/Stat';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/all_food",
        element: <AllFood />

      },
      {
        path: '/single/:id',
        element: <SingleFood />,
        loader: ({ params }) => fetch(`https://hungry-explorer-server.vercel.app/api/v1/all-foods/${params.id}`)
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/order/:id',
        element: <Private><Order /></Private>,
        loader: ({ params }) => fetch(`https://hungry-explorer-server.vercel.app/api/v1/all-foods/${params.id}`)
      },
      {
        path: '/cart',
        element: <Private> <Cart /> </Private>,

      },
      {
        path: '/add',
        element: <AddProduct />,
      },
      {
        path: '/my-food',
        element: <Private> <MyFood /> </Private>,
      },
      {
        path: '/update/:id',
        element: <Update />,
        loader: ({ params }) => fetch(`https://hungry-explorer-server.vercel.app/api/v1/all-foods/${params.id}`)
      }
      ,
      {
        path: '/payment',
        element: <Payment />
      },
      {
        path: "/stat",
        element: <Stat />
      }
    ]
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

import { useRoutes } from "react-router-dom";

/* Admin Routes */
import GuestRoutes from "./GuestRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

/* User Routes */
import Home from "../Pages/User/Home";
// import UserForgetPassword from "../Pages/User/Auth/ForgetPassword";
// import UserForgetPassword2 from "../Pages/User/Auth/ForgetPassword2";
// import UserForgetPassword3 from "../Pages/User/Auth/ForgetPassword3";

// import AboutUs from "../Pages/User/AboutUs";
import PreventUser from "./PreventUser";

import UserLogin from "../Pages/User/Auth/Login";
import UserSignup from "../Pages/User/Auth/Signup";
import Shop from "../Pages/User/Shop";
// import ContactUs from "../Pages/User/ContactUs";
// import OrderLogs from "../Pages/User/OrderLogs";
// import OrderLogsDetail from "../Pages/User/OrderLogs/OrderLogsDetail";
// import UserProfile from "../Pages/User/Profile";
// import UserChangePassword from "../Pages/User/Profile/UserChangePassword";
// import UserEditProfile from "../Pages/User/Profile/UserEditProfile";
// import Cart from "../Pages/User/Shop/Cart";
// import Checkout from "../Pages/User/Shop/Checkout";
// import ProductView from "../Pages/User/Shop/ProductView";
// import Wishlist from "../Pages/User/Shop/Wishlist";


import ScrollToTop from "../Components/ScrollToTop";

import ErrorPage from "../Pages/User/ErrorPage";

import MainLayout from "../Components/Layouts/UserLayout/MainLayout";




// import ScrollToTop from "../Components/UserComponents/ScrollToTop";

const roles = {
  user: "user",
};

// Refactor code - Change layout implementation
const routes = [
  {
    path: "/",
    element: <ScrollToTop />,
    children: [
  
      {
        element: <GuestRoutes user />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "", element: <Home /> },
              { path: "shop", element: <Shop />, },
              // { path: "contact-us", element: <ContactUs /> },
            ],
          },
          {
            element: <MainLayout />,
            children: [
              {
                element: <PreventUser />, // Wrap provider routes with PreventUser
                children: [
                  { path: "signup", element: <UserSignup /> },
                  { path: "login", element: <UserLogin /> },
                  // { path: "/forget-password", element: <UserForgetPassword /> },
                  // { path: "/forget-password2", element: <UserForgetPassword2 /> },
                  // { path: "/forget-password3", element: <UserForgetPassword3 /> },
                ],
              },
            ],
          },
          { path: "*", element: <ErrorPage /> },
        ],
      },
      {
        element: <ProtectedRoutes user roles={[roles.user]} />,
        // children: [
        //   // { path: "/", element: <Home /> },
        //   {
        //     element: <MainLayout />,
        //     children: [
        //       // { path: "/payment-successfull", element: <Suuccessfull /> },
        //       { path: "/profile", element: <UserProfile /> },
        //       { path: "/edit-profile", element: <UserEditProfile /> },
        //       { path: "/change-password", element: <UserChangePassword /> },


        //       { path: "/product-detail/:id", element: <ProductView /> },
        //       { path: "/wishlist/", element: <Wishlist /> },
        //       { path: "/view-cart/", element: <Cart /> },
        //       { path: "/checkout/", element: <Checkout /> },

        //       { path: "/order-logs/", element: <OrderLogs /> },
        //       { path: "/order-logs/:id", element: <OrderLogsDetail /> },

        //     ]
        //   },
        //   { path: "*", element: <ErrorPage /> },
        // ],
      },
      {
        path: "*",
        element: <h2>404</h2>,
        // element: <GlobalErrorPage />,
      },
    ],
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

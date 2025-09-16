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
import ProductView from "../Pages/User/Shop/ProductView";
import Cart from "../Pages/User/Shop/Cart";
import Checkout from "../Pages/User/Shop/Checkout";
import Search from "../Pages/User/Search";
// import ContactUs from "../Pages/User/ContactUs";
// import OrderLogs from "../Pages/User/OrderLogs";
// import OrderLogsDetail from "../Pages/User/OrderLogs/OrderLogsDetail";
// import UserProfile from "../Pages/User/Profile";
// import UserChangePassword from "../Pages/User/Profile/UserChangePassword";
// import UserEditProfile from "../Pages/User/Profile/UserEditProfile";
// import Wishlist from "../Pages/User/Shop/Wishlist";


import ScrollToTop from "../Components/ScrollToTop";
import ErrorPage from "../Pages/User/ErrorPage";
import MainLayout from "../Components/Layouts/UserLayout/MainLayout";
import OurStory from "../Pages/User/OurStory";
import Faqs from "../Pages/User/Faqs";




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
              { path: "shop", element: <Shop /> },
              { path: "product/:id/:slug", element: <ProductView /> },
              { path: "cart", element: <Cart /> },
              { path: "checkout", element: <Checkout /> },
              { path: "search", element: <Search /> },
              { path: "our-story", element: <OurStory /> },
              { path: "faqs", element: <Faqs /> },
            ],
          },
          {
            element: <MainLayout />,
            children: [
              {
                element: <PreventUser />,
                children: [
                  { path: "signup", element: <UserSignup /> },
                  { path: "login", element: <UserLogin /> },
                ],
              },
            ],
          },
          { path: "*", element: <ErrorPage /> },
        ],
      },
      {
        element: <ProtectedRoutes user roles={[roles.user]} />,
        children: [
          {
            element: <MainLayout />,
            children: [
              // { path: "profile", element: <UserProfile /> },
              // { path: "edit-profile", element: <UserEditProfile /> },
              // { path: "change-password", element: <UserChangePassword /> },
              // { path: "wishlist", element: <Wishlist /> },
              // { path: "order-logs", element: <OrderLogs /> },
              // { path: "order-logs/:id", element: <OrderLogsDetail /> },
            ],
          },
          { path: "*", element: <ErrorPage /> },
        ],
      },
      {
        path: "*",
        element: <h2>404</h2>,
      },
    ],
  },
];


const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;

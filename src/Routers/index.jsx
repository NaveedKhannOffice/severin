import { useRoutes } from "react-router-dom";

/* Admin Routes */
import GuestRoutes from "./GuestRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

/* User Routes */
import Home from "../Pages/User/Home";

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
import OrderLogs from "../Pages/User/OrderLogs";
import OrderLogsDetail from "../Pages/User/OrderLogs/OrderLogsDetail";
import UserProfile from "../Pages/User/Profile";
import UserChangePassword from "../Pages/User/Profile/UserChangePassword";
import UserEditProfile from "../Pages/User/Profile/UserEditProfile";
// import Wishlist from "../Pages/User/Shop/Wishlist";

import ScrollToTop from "../Components/ScrollToTop";
import ErrorPage from "../Pages/User/ErrorPage";
import MainLayout from "../Components/Layouts/UserLayout/MainLayout";
import OurStory from "../Pages/User/OurStory";
import Faqs from "../Pages/User/Faqs";
import AdminLogin from "../Pages/Admin/Auth/Login";
import ForgetPassword from "../Pages/Admin/Auth/ForgetPassword";
import ForgetPassword2 from "../Pages/Admin/Auth/ForgetPassword2";
import ForgetPassword3 from "../Pages/Admin/Auth/ForgetPassword3";
import PreventAdmin from "./PreventAdmin";
import { Dashboard } from "../Pages/Admin/Dashboard";
import UserManagement from "../Pages/Admin/UserManagement";
import UserDetails from "../Pages/Admin/UserManagement/UserDetails";
import UserOrderDetails from "../Pages/Admin/UserManagement/OrderDetails";
import ProductsManagement from "../Pages/Admin/ProductManagement";
import AddProducts from "../Pages/Admin/ProductManagement/AddProduct";
import EditProducts from "../Pages/Admin/ProductManagement/EditProduct";
import ViewProductsDetail from "../Pages/Admin/ProductManagement/ViewProduct";
import AdminProductDetails from "../Pages/Admin/Product/Product";
import ThemeSettings from "../Pages/Admin/ThemeSettings";
import ShopInformation from "../Pages/Admin/ShopInformation";


import Profile from "../Pages/Admin/Profile";
import EditProfile from "../Pages/Admin/Profile/EditProfile";
import ChangePassword from "../Pages/Admin/Profile/ChangePassword";
import ViewOrder from "../Pages/Admin/OrderManagement/ViewOrder";
import OrdersManagement from "../Pages/Admin/OrderManagement";

// import UserOrderDetail from "../Pages/Admin/UserManagement/OrderDetail";
// import UserPosts from "../Pages/Admin/UserManagement/UserPosts";
// import ServiceDetails from "../Pages/Admin/ServiceProviderManagement/ServiceDetails";
// import ServiceProviderDetails from "../Pages/Admin/ServiceProviderManagement/ServiceProviderDetails";
// import ServiceProviderManagement from "../Pages/Admin/ServiceProviderManagement/ServiceProviderManagement";
// import ServiceProviderProfile from "../Pages/Admin/ServiceProviderManagement/ServiceProviderProfile";
// import ServiceProviderRequests from "../Pages/Admin/ServiceProviderManagement/ServiceProviderRequests";
// import ServiceProviderServices from "../Pages/Admin/ServiceProviderManagement/ServiceProviderServices";
// import ShopDetails from "../Pages/Admin/ServiceProviderManagement/ShopDetails";
// import AddServiceCategory from "../Pages/Admin/ServiceCategoryManagement/AddServiceCategory";
// import EditServiceCategory from "../Pages/Admin/ServiceCategoryManagement/EditServiceCategory";
// import ServiceCategoryManagement from "../Pages/Admin/ServiceCategoryManagement/ServiceCategoryManagement";
// import ViewServiceCategory from "../Pages/Admin/ServiceCategoryManagement/ViewServiceCategory";
// import ContentManagement from "../Pages/Admin/ContentManagement/ContentManagement";
// import ViewBlogs from "../Pages/Admin/ContentManagement/Blogs/ViewBlogs";
// import ViewArticles from "../Pages/Admin/ContentManagement/Articles/ViewArticles";
// import ViewVideo from "../Pages/Admin/ContentManagement/Videos/ViewVideo";
// import ViewEBooks from "../Pages/Admin/ContentManagement/EBooks/ViewEBooks";
// import AddVideo from "../Pages/Admin/ContentManagement/Videos/AddVideo";
// import AddBlog from "../Pages/Admin/ContentManagement/Blogs/AddBlog";
// import AddArticle from "../Pages/Admin/ContentManagement/Articles/AddArticle";
// import AddEBook from "../Pages/Admin/ContentManagement/EBooks/AddEBook";
// import EditVideo from "../Pages/Admin/ContentManagement/Videos/EditVideo";
// import EditBlog from "../Pages/Admin/ContentManagement/Blogs/EditBlog";
// import EditArticle from "../Pages/Admin/ContentManagement/Articles/EditArticle";
// import EditEBook from "../Pages/Admin/ContentManagement/EBooks/EditEBook";
// import AppointmentLogs from "../Pages/Admin/AppointmentLogs/AppointmentLogs";
// import AppointmentDetails from "../Pages/Admin/AppointmentLogs/AppointmentDetails";

// import AddProductCategory from "../Pages/Admin/ProductCategoryManagement/AddProductCategory";
// import EditProductCategory from "../Pages/Admin/ProductCategoryManagement/EditProductCategory";
// import ProductCategoryManagement from "../Pages/Admin/ProductCategoryManagement/ProductCategoryManagement";
// import ViewProductCategoryDetail from "../Pages/Admin/ProductCategoryManagement/ViewProductCategoryDetail";

// import AddNewPlanProvider from "../Pages/Admin/SubscriptionLogs/AddNewPlanProvider";
// import AddNewPlanUser from "../Pages/Admin/SubscriptionLogs/AddNewPlanUser";
// import EditSubscriptionPlanProvider from "../Pages/Admin/SubscriptionLogs/EditSubscriptionPlanProvider";
// import EditSubscriptionPlanUser from "../Pages/Admin/SubscriptionLogs/EditSubscriptionPlanUser";
// import SubscriptionLogs from "../Pages/Admin/SubscriptionLogs/SubscriptionLogs";
// import SubscriptionPlansManagementProvider from "../Pages/Admin/SubscriptionLogs/SubscriptionPlansManagementProvider";
// import SubscriptionPlansManagementUser from "../Pages/Admin/SubscriptionLogs/SubscriptionPlansManagementUser";
// import ViewSubscriptionPlanProvider from "../Pages/Admin/SubscriptionLogs/ViewSubscriptionPlanProvider";
// import ViewSubscriptionPlanUser from "../Pages/Admin/SubscriptionLogs/ViewSubscriptionPlanUser";

// import QueriesManagement from "../Pages/Admin/QueriesManagement/QueriesManagement";
// import QueriesDetails from "../Pages/Admin/QueriesManagement/QueriesDetail";
// import PaymentLogs from "../Pages/Admin/PaymentLogs/PaymentLogs";
// import ReportsManagement from "../Pages/Admin/ReportsManagement/ReportsManagement";
// import ViewReport from "../Pages/Admin/ReportsManagement/ViewReport";
// import ReportDetails from "../Pages/Admin/ReportsManagement/ReportDetails";
// import ReportedPost from "../Pages/Admin/ReportsManagement/ReportedPost";
// import BannerAdsManagement from "../Pages/Admin/BannerAdsManagement/BannerAdsManagement";
// import BannerAdDetails from "../Pages/Admin/BannerAdsManagement/BannerAdDetails";
// import EditBanner from "../Pages/Admin/BannerAdsManagement/EditBanner";
// import AddBanner from "../Pages/Admin/BannerAdsManagement/AddBanner";
// import InAppPurchaseManagement from "../Pages/Admin/In-AppPurchaseManagement/InAppPurchaseManagement";
// import InAppPurchaseDetail from "../Pages/Admin/In-AppPurchaseManagement/InAppPurchaseDetail";
// import AddInAppPurchase from "../Pages/Admin/In-AppPurchaseManagement/AddInAppPurchase";
// import EditInAppPurchase from "../Pages/Admin/In-AppPurchaseManagement/EditInAppPurchase";
// import MyBankDetail from "../Pages/Admin/BankDetail/MyBankDetail";
// import AddBankDetail from "../Pages/Admin/BankDetail/AddBankDetail";
// import EditBankDetail from "../Pages/Admin/BankDetail/EditBankDetail";
// import EmergencyContactsManagement from "../Pages/Admin/EmergencyContactsManagement/EmergencyContactsManagement";
// import AddEmergencyContacts from "../Pages/Admin/EmergencyContactsManagement/AddEmergencyContacts";
// import EditEmergencyContacts from "../Pages/Admin/EmergencyContactsManagement/EditEmergencyContacts";
// import FAQsManagement from "../Pages/Admin/FAQsManagement/FAQsManagement";
// import AddFaqs from "../Pages/Admin/FAQsManagement/AddFaqs";
// import EditFaqs from "../Pages/Admin/FAQsManagement/EditFaqs";
// import NotificationsAdmin from "../Pages/Admin/Notifications";
// import CommissionManagement from "../Pages/Admin/CommissionManagement/CommissionManagement";
// import PayoutsManagement from "../Pages/Admin/PayoutsManagement/PayoutsManagement";
// import AdminErrorPage from "../Pages/Admin/ErrorPage";
// import ReferManagement from "../Pages/Admin/ReferManagement/ReferManagement";
// import ReferLogs from "../Pages/Admin/ReferManagement/ReferLogs";
// import AddReferReward from "../Pages/Admin/ReferManagement/AddReferReward";
// import EditReferReward from "../Pages/Admin/ReferManagement/EditReferReward";
// import ReferDetail from "../Pages/Admin/ReferManagement/ReferDetail";
// import ChallengeManagement from "../Pages/Admin/ChallengeManagement/ChallengeManagement";
// import AddNewChallenge from "../Pages/Admin/ChallengeManagement/AddNewChallenge";
// import EditChallenge from "../Pages/Admin/ChallengeManagement/EditChallenge";
// import ChallengeDetail from "../Pages/Admin/ChallengeManagement/ChallengeDetail";

// import ScrollToTop from "../Components/UserComponents/ScrollToTop";

const roles = {
    user: "user",
    admin: "admin",
};

// Refactor code - Change layout implementation
const routes = [
    {
        path: "/",
        element: <ScrollToTop />,
        children: [
            {
                element: <GuestRoutes admin />,
                children: [
                    { path: "admin", element: <AdminLogin /> },
                    { path: "admin/login", element: <AdminLogin /> },
                    { path: "admin/forget-password", element: <ForgetPassword /> },
                    { path: "admin/forget-password2", element: <ForgetPassword2 /> },
                    { path: "admin/forget-password3", element: <ForgetPassword3 /> },
                    { path: "admin/*", element: <PreventAdmin /> },
                ],
            },
            {
                element: <ProtectedRoutes admin roles={[roles.admin]} />,
                children: [
                    { path: "admin/*", element: <PreventAdmin /> },
                    { path: "admin/profile", element: <Profile /> },
                    { path: "admin/edit-profile", element: <EditProfile /> },
                    { path: "admin/change-password", element: <ChangePassword /> },

                    { path: "admin/dashboard", element: <Dashboard /> },
                    { path: "admin/theme-settings", element: <ThemeSettings /> },
                    { path: "admin/shop-information", element: <ShopInformation /> },

                    {
                        path: "admin/products-management",
                        element: <ProductsManagement />,
                    },
                    {
                        path: "admin/products-management/add-product",
                        element: <AddProducts />,
                    },
                    {
                        path: "admin/products-management/:id/edit",
                        element: <EditProducts />,
                    },
                    {
                        path: "admin/products-management/:id",
                        element: <ViewProductsDetail />,
                    },
                    {
                        path: "admin/orders-management",
                        element: <OrdersManagement />,
                    },
                    {
                        path: "admin/orders-management/:id",
                        element: <ViewOrder />,
                    },

                    { path: "admin/orders/:id", element: <ViewOrder /> },

                    // User Management
                    { path: "admin/user-management", element: <UserManagement /> },
                    { path: "admin/user-management/:id", element: <UserDetails /> },



                ],
            },

            {
                element: <GuestRoutes user />,
                children: [
                    {
                        element: <MainLayout />,
                        children: [
                            { path: "/", element: <Home /> },
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
                            { path: "user/dashboard", element: <UserProfile /> },
                            { path: "profile", element: <UserProfile /> },
                            { path: "edit-profile", element: <UserEditProfile /> },
                            { path: "change-password", element: <UserChangePassword /> },
                            // { path: "wishlist", element: <Wishlist /> },
                            { path: "order-logs", element: <OrderLogs /> },
                            { path: "order-logs/:id", element: <OrderLogsDetail /> },
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

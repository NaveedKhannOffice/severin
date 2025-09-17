import { AuthLayout } from "../../../Components/Layouts/AdminLayout/Auth";
import "./style.css";
import { usePageTitle } from "../../../Utils/helper.jsx";
// import { loginValidationSchema } from "../../../Config/Validations.jsx";
import { loginValidationSchema } from "../../../Config/Validations.jsx";
// import LoginForm from "../../../Components/LoginForm/index.jsx";
// import LoginForm from "../../../Components/LoginForm/index.jsx";

const AdminLogin = () => {
  usePageTitle("Admin Login");
  return (
    <>
      <AuthLayout authTitle="admin login" authMain authPara="Log In to Your Account" authLeftText="Your Journey to Emotional Wellness Starts Here">
        {/* <LoginForm
          actor="admin"
          apiEndpoint="/admin/login"
          validationSchema={loginValidationSchema}
        /> */}
      </AuthLayout>
    </>
  );
};

export default AdminLogin;

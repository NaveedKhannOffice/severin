// import { AuthLayout } from "../../../Components/Layouts/AdminLayout/Auth";
import { UserAuthLayout } from "../../../Components/Layouts/UserLayout/AuthLayout";
import LoginForm from "../../../Components/LoginForm";
import { loginValidationSchema } from "../../../Config/Validations";
import { usePageTitle } from "../../../Utils/helper";
import "./style.css";

const UserLogin = () => {
  usePageTitle("User Login");
  return (
    <>
      <UserAuthLayout
        authTitle="Login Account"
        authMain
        authPara="Log In to Your Account"
        authLeftText="find support system in a community that understands"
      >
        <LoginForm
          actor="user"
          apiEndpoint="/user/login"
          validationSchema={loginValidationSchema}
        />
      </UserAuthLayout>
    </>
  );
};

export default UserLogin;

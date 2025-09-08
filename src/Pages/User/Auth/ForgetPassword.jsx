// import StepOne from "../../../Components/ForgetPasswordComponents/StepOne.jsx";

import { UserAuthLayout } from "../../../Components/Layouts/UserLayout/AuthLayout/index.jsx";
const UserForgetPassword = () => {
  return (
    <UserAuthLayout
      authTitle="Forgot Password"
      authPara="Enter your email address to receive a verification code"
      authLeftText="find support in your community that understands"
      backOption={true}
      authMain
    >
      {/* <StepOne
                apiEndpoint="/service-provider/reset/password"
                navigateTo="/forget-password2"
            // navigateTo="/forget-password2"
            /> */}
    </UserAuthLayout>
  );
};

export default UserForgetPassword;

// import StepTwo from "../../../Components/ForgetPasswordComponents/StepTwo";
import { UserAuthLayout } from "../../../Components/Layouts/UserLayout/AuthLayout";
const UserForgetPassword2 = () => {
  return (
    <UserAuthLayout
      authTitle="Forgot Password"
      authPara="Enter an email address / Phone Number to receive a verification code"
      authLeftText="find support in your community that understands"
      backOption={true}
      authMain
    >
      {/* <StepTwo
        apiEndpoint="/service-provider/verify/code"
        resendEndpoint="/service-provider/reset/password"
        navigateTo="/forget-password3"
      /> */}
    </UserAuthLayout>
  );
};

export default UserForgetPassword2;

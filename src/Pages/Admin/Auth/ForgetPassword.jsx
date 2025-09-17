import { AuthLayout } from "../../../Components/Layouts/AdminLayout/Auth";
// import StepOne from "../../../Components/ForgetPasswordComponents/StepOne.jsx";
const ForgetPassword = () => {
  return (
    <AuthLayout
      authTitle="Forgot Password"
      authPara="Enter your email address to receive a verification code"
      authLeftText="Your Journey to Emotional Wellness Starts Here"
      backOption={true}
      authMain
    >
        {/* <StepOne
          apiEndpoint="/reset/password"
          navigateTo="/admin/forget-password2"
        /> */}
    </AuthLayout>
  );
};

export default ForgetPassword;

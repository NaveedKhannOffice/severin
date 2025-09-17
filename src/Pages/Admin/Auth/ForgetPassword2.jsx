import { AuthLayout } from "../../../Components/Layouts/AdminLayout/Auth";
// import StepTwo from "../../../Components/ForgetPasswordComponents/StepTwo";
const ForgetPassword2 = () => {
  return (
    <AuthLayout
      authTitle="Forgot Password"
      authPara="An email has been sent to you with a verification code. Please enter it here."
      authLeftText="Your Journey to Emotional Wellness Starts Here"
      backOption={true}
      authMain
    >
      {/* <StepTwo
        apiEndpoint="/verify/code"
        resendEndpoint="/reset/password"
        navigateTo="/admin/forget-password3"
      /> */}
    </AuthLayout>
  );
};

export default ForgetPassword2;

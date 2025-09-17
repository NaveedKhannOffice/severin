// import StepThree from "../../../Components/ForgetPasswordComponents/StepThree";
import { AuthLayout } from "../../../Components/Layouts/AdminLayout/Auth";
const ForgetPassword3 = () => {
  return (
    <AuthLayout authTitle="Forgot Password" authPara="Set new password for your account" authLeftText="Your Journey to Emotional Wellness Starts Here" authMain backOption={true}>
        {/* <StepThree
          apiEndpoint="/set/password"
          navigateTo="/admin"
        /> */}
    </AuthLayout>
  );
};

export default ForgetPassword3;

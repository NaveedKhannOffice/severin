// import StepThree from "../../../Components/ForgetPasswordComponents/StepThree";
import { UserAuthLayout } from "../../../Components/Layouts/UserLayout/AuthLayout";
const UserForgetPassword3 = () => {
  return (
    <UserAuthLayout authTitle="Forgot Password" authPara="Enter your verification code that we send you on phone" authLeftText="find support in your community that understands" authMain backOption={true}>
      {/* <StepThree
        apiEndpoint="/service-provider/set/password"
        navigateTo="/provider"
      /> */}
    </UserAuthLayout>
  );
};

export default UserForgetPassword3;

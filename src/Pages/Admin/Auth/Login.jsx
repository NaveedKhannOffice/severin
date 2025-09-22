import { AuthLayout } from "../../../Components/Layouts/AdminLayout/Auth";
import "./style.css";
import { usePageTitle } from "../../../Utils/helper.jsx";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useLogin } from "../../../Services/Auth";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import CustomButton from "../../../Components/Common/CustomButton";
import { loginValidationSchema } from "../../../Config/Validations.jsx";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import { FormCheck } from "react-bootstrap";
import { Formik, Form } from "formik";
import { showToast } from "../../../Components/Common/Toast/index";
import { loginCredentials } from "../../../Config/data";
import { setData, setRoles, setToken } from "../../../Store/actions";
// import { loginValidationSchema } from "../../../Config/Validations.jsx";
// import LoginForm from "../../../Components/LoginForm/index.jsx";
// import LoginForm from "../../../Components/LoginForm/index.jsx";

import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
    usePageTitle("Admin Login");
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus(); // use your custom hook
    const navigate = useNavigate();
    const login = useLogin();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        startSubmitting();
        console.log(values, "values");

        try {
            // Check if using demo mode or real API
            const isDemoMode = true; // Set to false when using real API

            if (isDemoMode) {
                // Demo mode: Using static credentials
                const currentUser = loginCredentials.find(
                    (user) => user.email === values.email && user.password === values.password
                );

                if (currentUser && currentUser.status) {
                    // Using Redux for state management
                    dispatch(setToken(currentUser.token));
                    dispatch(setRoles(currentUser.role));
                    dispatch(setData(currentUser));
                    showToast(currentUser.message, "success");

                    setTimeout(() => {
                        if (currentUser?.role === "admin") {
                            navigate(`/admin/dashboard`);
                        } else {
                            navigate(`/`);
                        }
                    }, 1000);
                } else {
                    showToast("Invalid credentials", "error");
                }
            } else {

                const payload = {
                    ...values,
                    source: "user"
                };
                // Real API mode: Using useLogin hook
                const apiEndpoint = '/user/login'; // Replace with your actual API endpoint

                const response = await login(apiEndpoint, payload);

                console.log("Login response:", response);

                if (response && response.data) {
                    // The useLogin hook already handles Redux state updates
                    showToast("Login successful", "success");

                    setTimeout(() => {
                        if (response.data.user.type === "admin") {
                            navigate(`/admin/dashboard`);
                        } else {
                            navigate(`/`);
                        }
                    }, 1000);
                } else {
                    showToast("Login failed", "error");
                }
            }

        } catch (error) {
            console.error("Login error:", error);
            showToast("Login failed. Please try again.", "error");
        } finally {
            stopSubmitting();
        }
    };
    return (

        <>
            <AuthLayout authTitle="admin login" authMain authPara="Log In to Your Account" authLeftText="Your Journey to Emotional Wellness Starts Here">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form className="mt-3 login-form" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                {/* {console.log(errors, "errors")} */}
                                <TextInput
                                    id="email"
                                    name="email"
                                    //   label="Email Address"
                                    type="text"
                                    placeholder="Your usernam or email address"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && errors.email}
                                    touched={touched.email && errors.email}
                                    labelClassName="label-padding-left"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <TextInput
                                    id="password"
                                    name="password"
                                    //   label="Password"
                                    type="password"
                                    placeholder="Enter Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && errors.password}
                                    labelClassName="label-padding-left"
                                    required
                                />
                            </div>

                            <div className="d-flex align-items-center justify-content-between mt-1 flex-wrap gap-sm-0 gap-2">
                                <FormCheck
                                    type={"checkbox"}
                                    name="rememberMe"
                                    id="rememberMe"
                                    label={`Remember Me`}
                                    className="remember-checkbox"
                                />
                                <Link
                                    to={"/forget-password"}
                                    className="fw-regular text-link forgot-link"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="mt-4 mt-lg-5 text-center">
                                <CustomButton
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                    text="Log In"
                                    loadingText="Submitting..."
                                    loading={isSubmitting}
                                    disabled={isSubmitting}
                                />
                                {/* <CustomButton
                              type="submit"
                              loading={isSubmitting || loginMutation.isPending}
                              disabled={isSubmitting || loginMutation.isPending}
                              loadingText="Submitting..."
                              text="Submit"
                              className="w-100"
                          /> */}
                            </div>
                        </Form>
                    )}
                </Formik>

            </AuthLayout>
        </>
    );
};

export default AdminLogin;

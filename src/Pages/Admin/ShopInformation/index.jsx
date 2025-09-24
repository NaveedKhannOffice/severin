import { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import RichTextEditor from "../../../Components/Common/FormElements/RichTextEditor";
import CustomButton from "../../../Components/Common/CustomButton";
import LoadingSpinner from "../../../Components/Common/Loader";
import { shopInformationSchema } from "../../../Config/Validations";
import { getDetails, post } from "../../../Services/Api";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import withModal from "../../../HOC/withModal";

const DEFAULT_VALUES = {
    copy_right: "",
    facebook_link: "",
    twitter_link: "",
    instagram_link: "",
    about_us: "",
    our_story: "",
    privacy_policy: "",
    terms_of_service: "",
};

const extractHtmlText = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim();

const ShopInformation = ({ showModal }) => {
    const [initialValues, setInitialValues] = useState(DEFAULT_VALUES);
    const [loading, setLoading] = useState(true);
    const { isSubmitting, startSubmitting, stopSubmitting } = useFormStatus();

    const fetchInformation = useCallback(async (withLoader = true) => {
        if (withLoader) {
            setLoading(true);
        }
        try {
            const response = await getDetails("/admin/shop-information");
            console.log("Fetched shop information:", response);
            const payload =
                response?.data?.shopInformation || response?.data || response || {};
            setInitialValues({
                ...DEFAULT_VALUES,
                ...(payload || {}),
            });
        } catch (error) {
            console.error("Failed to fetch shop information", error);
        } finally {
            if (withLoader) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        fetchInformation();
    }, [fetchInformation]);

    const handleSubmit = async (values, formikHelpers) => {
        startSubmitting();
        console.log("Submitting values:", values);
        try {
            const sanitizedValues = {
                ...values,
                about_us: extractHtmlText(values.about_us) ? values.about_us : "",
                our_story: extractHtmlText(values.our_story) ? values.our_story : "",
                privacy_policy: extractHtmlText(values.privacy_policy)
                    ? values.privacy_policy
                    : "",
                terms_of_service: extractHtmlText(values.terms_of_service)
                    ? values.terms_of_service
                    : "",
            };

            const response = await post("/admin/shop-information", sanitizedValues);
            console.log("Update response:", response);
            if (response?.status) {
                await fetchInformation(false);
                formikHelpers.resetForm({ values: sanitizedValues });
                showModal(
                    "Shop Information Updated",
                    "All changes have been saved successfully.",
                    undefined,
                    true
                );
            } else {
                const message =
                    response?.message || "Unable to update shop information right now.";
                showModal("Update Failed", message, undefined, false);
            }
        } catch (error) {
            console.error("Shop information update failed", error);
            showModal(
                "Update Failed",
                "An unexpected error occurred while saving shop information.",
                undefined,
                false
            );
        } finally {
            stopSubmitting();
        }
    };

    if (loading) {
        return (
            <DashboardLayout pageTitle="Shop Information">
                <div className="container-fluid py-5">
                    <LoadingSpinner />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout pageTitle="Shop Information">
            <div className="container-fluid py-4">
                <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3 mb-4">
                    <div>
                        <h2 className="mainTitle mb-1">Shop Information</h2>
                        <p className="text-muted mb-0">
                            Keep your storefront details polished - they appear across customer facing pages.
                        </p>
                    </div>
                </div>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={shopInformationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit} className="shop-info-form">
                            <div className="dashCard mb-4">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                                    <div>
                                        <h5 className="mb-1">Brand Basics</h5>
                                        <p className="text-muted mb-0">
                                            Define your brand signature and social presence in one place.
                                        </p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        {/* <CustomButton
                                            type="button"
                                            variant="outline-secondary"
                                            className="px-4"
                                            onClick={() => resetForm({ values: initialValues })}
                                            disabled={isSubmitting}
                                        >
                                            Reset Changes
                                        </CustomButton> */}
                                        <CustomButton
                                            type="submit"
                                            variant="primary"
                                            className="px-4"
                                            loading={isSubmitting}
                                            loadingText="Saving..."
                                        >
                                            Save Updates
                                        </CustomButton>
                                    </div>
                                </div>

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <TextInput
                                            label="Copyright Text"
                                            labelclass="mainLabel"
                                            placeholder="(c) 2025 Severin. All rights reserved."
                                            inputclass="mainInput"
                                            id="copy_right"
                                            name="copy_right"
                                            value={values.copy_right}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            error={touched.copy_right && errors.copy_right}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <TextInput
                                            label="Facebook URL"
                                            labelclass="mainLabel"
                                            placeholder="https://facebook.com/yourbrand"
                                            inputclass="mainInput"
                                            id="facebook_link"
                                            name="facebook_link"
                                            value={values.facebook_link}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.facebook_link && errors.facebook_link}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <TextInput
                                            label="Twitter URL"
                                            labelclass="mainLabel"
                                            placeholder="https://twitter.com/yourbrand"
                                            inputclass="mainInput"
                                            id="twitter_link"
                                            name="twitter_link"
                                            value={values.twitter_link}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.twitter_link && errors.twitter_link}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <TextInput
                                            label="Instagram URL"
                                            labelclass="mainLabel"
                                            placeholder="https://instagram.com/yourbrand"
                                            inputclass="mainInput"
                                            id="instagram_link"
                                            name="instagram_link"
                                            value={values.instagram_link}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.instagram_link && errors.instagram_link}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="dashCard mb-4">
                                <div className="mb-4">
                                    <h5 className="mb-1">Storytelling Blocks</h5>
                                    <p className="text-muted mb-0">
                                        Craft immersive narratives for About, Story and policy experiences.
                                    </p>
                                </div>

                                <div className="row g-4">
                                    <div className="col-12">
                                        <RichTextEditor
                                            id="about_us"
                                            label="About Us"
                                            required
                                            value={values.about_us}
                                            onChange={(content) => setFieldValue("about_us", content)}
                                            onBlur={() => setFieldTouched("about_us", true)}
                                            error={touched.about_us && errors.about_us}
                                            helperText="Share what makes your brand unique."
                                        />
                                    </div>

                                    <div className="col-12">
                                        <RichTextEditor
                                            id="our_story"
                                            label="Our Story"
                                            value={values.our_story}
                                            onChange={(content) => setFieldValue("our_story", content)}
                                            onBlur={() => setFieldTouched("our_story", true)}
                                            error={touched.our_story && errors.our_story}
                                            helperText="Highlight the journey that shaped your shop."
                                        />
                                    </div>

                                    <div className="col-12">
                                        <RichTextEditor
                                            id="privacy_policy"
                                            label="Privacy Policy"
                                            value={values.privacy_policy}
                                            onChange={(content) =>
                                                setFieldValue("privacy_policy", content)
                                            }
                                            onBlur={() => setFieldTouched("privacy_policy", true)}
                                            error={touched.privacy_policy && errors.privacy_policy}
                                            helperText="Outline how you store and protect customer information."
                                        />
                                    </div>

                                    <div className="col-12">
                                        <RichTextEditor
                                            id="terms_of_service"
                                            label="Terms of Service"
                                            value={values.terms_of_service}
                                            onChange={(content) =>
                                                setFieldValue("terms_of_service", content)
                                            }
                                            onBlur={() => setFieldTouched("terms_of_service", true)}
                                            error={touched.terms_of_service && errors.terms_of_service}
                                            helperText="Set the expectations for customers engaging with your shop."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                {/* <CustomButton
                                    type="button"
                                    variant="outline-secondary"
                                    className="px-4"
                                    onClick={() => resetForm({ values: initialValues })}
                                    disabled={isSubmitting}
                                >
                                    Reset Changes
                                </CustomButton> */}
                                <CustomButton
                                    type="submit"
                                    variant="primary"
                                    className="px-4"
                                    loading={isSubmitting}
                                    loadingText="Saving..."
                                >
                                    Save Updates
                                </CustomButton>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </DashboardLayout>
    );
};

export default withModal(ShopInformation);

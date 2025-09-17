import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../Components/Common/CustomButton';
import { isNullOrEmpty } from '../../../../Utils/Utils'; // TODO: check if this is correct
import { changePasswordSchema } from '../../../../Utils/Validations/ValidationSchemas';
import { useMutation } from '@tanstack/react-query';
import { passwordUpdate } from '../../../../Services/Coach/Profile';
import { showToast } from '../../../../Components/Toast/Toast';
import { usePageTitle } from '../../../../Hooks/usePageTitle';
import { Col, Row } from 'react-bootstrap';
import TextInput from '../../../../Components/Common/FormElements/TextInput';
import withModal from '../../../../HOC/withModal';
import BackButton from '../../../../Components/BackButton';

const AssistantCoachChangePassword = ({ showModal }) => {
  usePageTitle('Change Password');

  const navigate = useNavigate();

  const updatePasswordMutation = useMutation({
    mutationFn: passwordUpdate,
    onSuccess: () => {
      showModal(
        '',
        'Password Updated Successfully',
        () => {
          navigate('/settings/profile');
        },
        'success'
      );
      navigate('/settings/profile');
    },
    onError: (error) => {
      console.error('Failed to update password', error);
      if (!isNullOrEmpty(error.errors?.email)) {
        showToast(error.errors.email[0], 'error');
      }
      showToast(error.message, 'error');
    },
  });

  const handleChangePasswordSubmit = (values) => {
    console.log('values', values);
    showModal(
      'Password Updated Successfully',
      'Password Updated Successfully',
      () => {
        navigate('/settings/profile');
      },
      'success'
    );

    updatePasswordMutation.mutate(values);
  };

  return (
    <>
      <div className="p-4 ps-xl-4 p-xxl-5 page-content content-bg-image rounded-20 profile-management">
        <div className="d-flex gap-2 mb-4 mb-lg-5">
          <BackButton />
          <h2 className="page-title">Change Password</h2>
        </div>

        <Row>
          <Col md={12} lg={8} xl={6} xxl={5}>
            <Formik
              initialValues={{
                current_password: '',
                password: '',
                password_confirmation: '',
              }}
              validationSchema={changePasswordSchema}
              onSubmit={handleChangePasswordSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form>
                  <Row>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'current_password'}
                        type={'password'}
                        required
                        label={'Current Password'}
                        placeholder={'Enter Current Password'}
                        value={values.current_password}
                        labelClassName={`label-padding-left`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.current_password && errors.current_password
                        }
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'password'}
                        type={'password'}
                        required
                        label={'New Password'}
                        placeholder={'Enter New Password'}
                        value={values.password}
                        labelClassName={`label-padding-left`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'password_confirmation'}
                        type={'password'}
                        required
                        label={'Confirm Password'}
                        placeholder={'Re-Enter New Password'}
                        value={values.password_confirmation}
                        labelClassName={`label-padding-left`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.password_confirmation &&
                          errors.password_confirmation
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12}>
                      <CustomButton
                        type="submit"
                        text={'Update Password'}
                        loadingText="Updating..."
                        loading={
                          isSubmitting || updatePasswordMutation.isPending
                        }
                        className="min-width-220 text-uppercase"
                      />
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withModal(AssistantCoachChangePassword);

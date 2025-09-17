import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../../Components/Common/CustomButton';
import useUserStore from '../../../../Stores/UserStore';
import { isNullOrEmpty, validateImage } from '../../../../Utils/Utils';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { editAdminProfileSchema } from '../../../../Utils/Validations/ValidationSchemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { profileUpdateForAssistantCoach, getCoachRoles } from '../../../../Services/AssistantCoach/Profile';
import { showToast } from '../../../../Components/Toast/Toast';
import { usePageTitle } from '../../../../Hooks/usePageTitle';
import { Col, Row } from 'react-bootstrap';
import { images } from '../../../../assets/';
import TextInput from '../../../../Components/Common/FormElements/TextInput';
import withModal from '../../../../HOC/withModal';
import { MdOutlineCameraAlt } from 'react-icons/md';
import BackButton from '../../../../Components/BackButton';
import SelectInput from '../../../../Components/Common/FormElements/SelectInput';

const AssistantCoachEditProfile = ({ showModal }) => {
  usePageTitle('Edit Profile');

  let { user } = useUserStore();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(
    user?.photo || images.UserProfilePlaceholder
  );

  // Roles options
  const { data: rolesRes } = useQuery({
    queryKey: ['coachRoles'],
    queryFn: getCoachRoles,
    staleTime: 5 * 60 * 1000,
  });
  const roleOptions = (rolesRes?.data || []).map(r => ({ value: String(r.id), label: r.name }));

  const updateProfileMutation = useMutation({
    mutationFn: profileUpdateForAssistantCoach,
    onSuccess: (value) => {
      setUser(value.data);
      showModal(
        'Profile Updated Successfully',
        'Profile has been updated successfully.',
        () => {
          navigate('/settings/profile');
        },
        'success'
      );
    },
    onError: (error) => {
      console.error('Failed to update profile', error);
      if (!isNullOrEmpty(error.errors?.email)) {
        showToast(error.errors.email[0], 'error');
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      const validationError = validateImage(file);
      if (validationError) {
        showToast(validationError, 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Set the file for form submission
      setSelectedProfileImage(file);
    }
  };

  const handleEditProfileSubmit = (values) => {
    console.log('values', values);
    // showModal(
    //   'Profile Updated Successfully',
    //   'Profile has been updated successfully.',
    //   () => {
    //     navigate('/settings/profile');
    //   },
    //   'success'
    // );

    // Build payload expected by service
    // Derive dialing_code and country_code using libphonenumber-js
    let dialing_code = values.dialing_code || user?.dialing_code || '';
    let country_code = values.country_code || user?.country_code || 'US';
    if (values.phone) {
      const parsed = parsePhoneNumberFromString(values.phone);
      if (parsed) {
        if (String(values.phone).startsWith('+')) {
          dialing_code = `+${parsed.countryCallingCode}`;
          country_code = parsed.country || country_code;
        } else {
          // keep provided dialing/country if present; otherwise infer
          dialing_code = dialing_code || `+${parsed.countryCallingCode}`;
          country_code = country_code || parsed.country || 'US';
        }
      }
    }

    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone,
      dialing_code,
      country_code,
      // optional mapping
      position: values.position,
      user_position_id: values.user_position_id,
      role_id: values.role_id,
      user_role: values.user_role,
      title: values.title ?? values.user_title,
      bio_data: values.bio_data ?? values.bio,
      // photo file
      photo: selectedProfileImage || undefined,
    };
    updateProfileMutation.mutate(payload);
  };

  return (
    <>
      <div className="p-4 ps-xl-4 p-xxl-5 page-content content-bg-image rounded-20 profile-management">
        <div className="d-flex gap-2 mb-4 mb-lg-5">
          <BackButton />
          <h2 className="page-title">Edit Profile</h2>
        </div>

        <Row>
          <Col md={12} lg={8} xl={6} xxl={6}>
            <Formik
              initialValues={{
                ...user,
                position: user?.position || '',
                role_id: String(
                  (user?.staff_detail?.role?.id) || (user?.staffDetail?.role?.id) || user?.role_id || ''
                ),
                title: user?.title || '',
                bio_data: user?.bio_data || user?.bio || '',
              }}
              validationSchema={editAdminProfileSchema}
              onSubmit={handleEditProfileSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form>
                  <Row>
                    <Col xs={12} className="mb-3 mb-xxl-5">
                      <div className="admin-profile-img position-relative">
                        <img
                          src={profileImage}
                          className="img-fluid ml-0"
                          alt="Profile"
                        />

                        <div className="image-upload-overlay">
                          <label
                            htmlFor="image-upload"
                            className="upload-profile-btn"
                          >
                            <MdOutlineCameraAlt />
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'first_name'}
                        type={'text'}
                        required
                        label={'First Name'}
                        placeholder={'Enter First Name'}
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.first_name && errors.first_name}
                        labelClassName={`label-padding-left`}
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'last_name'}
                        type={'text'}
                        required
                        label={'Last Name'}
                        placeholder={'Enter Last Name'}
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_name && errors.last_name}
                        labelClassName={`label-padding-left`}
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'phone'}
                        type={'tel'}
                        required
                        label={'Mobile Phone No.'}
                        placeholder={'Enter Phone Number'}
                        value={values.dialing_code + values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && errors.phone}
                        labelClassName={`label-padding-left`}
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-4">
                      <TextInput
                        name={'email'}
                        type={'email'}
                        label={'Email Address'}
                        placeholder={'Enter Email'}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        labelClassName={`label-padding-left mb-0`}
                        readOnly
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-3 mb-xxl-4">
                      <TextInput
                        label="Position"
                        type="text"
                        id="position"
                        name="position"
                        labelClassName="label-padding-left"
                        placeholder="Enter Position"
                        value={values.position}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.position && errors.position}
                        required
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-3 mb-xxl-4">
                      <SelectInput
                        id="role_id"
                        name="role_id"
                        label="Role"
                        value={values.role_id || ''}
                        onChange={(value) => setFieldValue('role_id', value)}
                        onBlur={handleBlur}
                        touched={true}
                        options={roleOptions}
                        error={touched.role_id && errors.role_id}
                        labelClassName="label-padding-left"
                        required
                        placeholder="Select Role"
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-3 mb-xxl-4">
                      <TextInput
                        label="Title"
                        type="text"
                        id="title"
                        name="title"
                        labelClassName="label-padding-left"
                        placeholder="Enter Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && errors.title}
                        required
                      />
                    </Col>
                    <Col xs={12} className="mb-3 mb-lg-3 mb-xxl-4">
                      <TextInput
                        label="Bio Data"
                        type="textarea"
                        id="bio"
                        name="bio_data"
                        rows={6}
                        labelClassName="label-padding-left"
                        placeholder="Enter Bio"
                        value={values.bio_data}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bio_data && errors.bio_data}
                        required
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col xs={12}>
                      <CustomButton
                        type="submit"
                        text={'Update'}
                        loading={
                          isSubmitting || updateProfileMutation.isPending
                        }
                        disabled={
                          isSubmitting || updateProfileMutation.isPending
                        }
                        loadingText="Updating..."
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

export default withModal(AssistantCoachEditProfile);

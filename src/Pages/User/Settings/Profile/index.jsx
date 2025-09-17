import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { usePageTitle } from '../../../../Hooks/usePageTitle';
import withModal from '../../../../HOC/withModal';
import useUserStore from '../../../../Stores/UserStore';
import { images } from '../../../../assets';
import { Link } from 'react-router-dom';


import {
    getCountryFlag,
    isNullOrEmpty,
} from '../../../../Utils/Utils';
import { useQuery } from '@tanstack/react-query';
import { getAssistantCoachProfile } from '../../../../Services/AssistantCoach/Profile';

const AssistantCoachProfile = () => {
    usePageTitle('Settings');
    const { user, role } = useUserStore();
    const setUser = useUserStore((s) => s.setUser);

    const { data: profileRes } = useQuery({
        queryKey: ['assistantCoachProfile'],
        queryFn: getAssistantCoachProfile,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (profileRes?.data) {
            setUser(profileRes.data);
        }
    }, [profileRes?.data]);

    console.log(user, 'test');
    return (
        <div className="p-4 ps-xl-4 p-xxl-5 page-content content-bg-image rounded-20 profile-management">
            <h2 className="page-title mb-4">My Profile</h2>
            <Row>
                <Col xl={12} xxl={11}>
                    {!isNullOrEmpty(user) ? (
                        <>
                            <Row>
                                <Col xs={12} className="mb-3 mb-lg-4 mb-xxl-5">
                                    <div className="admin-profile-img">
                                        <img
                                            src={user?.photo || images.UserProfilePlaceholder}
                                            className="img-fluid ml-0"
                                            alt=""
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">First Name</h5>
                                    <p className="fw-regular">{user?.first_name}</p>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Last Name</h5>
                                    <p className="fw-regular">{user?.last_name}</p>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Mobile phone no.</h5>
                                    <p className="fw-regular">
                                        {getCountryFlag(user?.dialing_code + "" + user?.phone)} {user?.phone}
                                    </p>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Email address</h5>
                                    <p className="fw-regular">{user?.email}</p>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Position</h5>
                                    <p className="fw-regular">{user?.position || '-'}</p>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Role</h5>
                                    <p className="fw-regular">{user?.staffDetail?.role?.name || '-'}</p>
                                </Col>
                                <Col
                                    xs={12}
                                    lg={6}
                                    xl={4}
                                    xxl={3}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Title</h5>
                                    <p className="fw-regular">{user?.title || '-'}</p>
                                </Col>
                                <Col
                                    xs={12}
                                    xl={12}
                                    xxl={10}
                                    className="mb-3 mb-lg-4 mb-xxl-5 detail-box"
                                >
                                    <h5 className="mb-2">Bio</h5>
                                    <p className="fw-regular">{user?.bio_data || '-'}</p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12} className="text-center d-flex gap-4 flex-wrap">
                                    <Link
                                        to="/settings/edit-profile"
                                        className="btn btn-primary min-width-230 text-uppercase"
                                    >
                                        Edit Profile
                                    </Link>
                                    <Link
                                        to="/settings/change-password"
                                        className="btn btn-link px-0 fst-italic"
                                    >
                                        Change Password
                                    </Link>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default withModal(AssistantCoachProfile);

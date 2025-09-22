import React, { useState } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { useLocation, NavLink, Outlet } from 'react-router-dom';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import './style.css';

import { useLogout } from '../../../Hooks/useLogout';
import CustomModal from '../../../Components/Common/CustomModal';
import useUserStore from '../../../Stores/UserStore';

const AssistantCoachSettings = () => {
  usePageTitle('Settings');
  const { role } = useUserStore();
  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);
  const logoutMutation = useLogout();

  const isProfileActive =
    location.pathname.includes('/settings/profile') ||
    location.pathname === '/settings';

  const handleLogoutClick = () => {
    setLogoutModal(true);
  };
  const logoutAdmin = () => {
    logoutMutation.mutate(role);
  };

  console.log(role);
  return (
    <section className="page-section settings-page my-lg-3">
      <Container fluid>
        <Row>
          <Col xs={12} md={4} lg={3} className="mb-4 mb-md-0">
            <div className="settings-sidebar">
              <div className="sidebar-header mb-4 mb-lg-5">
                <h5 className="page-title mb-0">Settings</h5>
              </div>
              <Nav variant="pills" as="ul" className="settings-nav">
                <Nav.Item as="li">
                  <NavLink
                    to="/settings/profile"
                    className={isProfileActive ? 'nav-link active' : 'nav-link'}
                  >
                    My Profile
                  </NavLink>
                </Nav.Item>
                <Nav.Item as="li">
                  <NavLink to="theme" className="nav-link">
                    Theme
                  </NavLink>
                </Nav.Item>
                <Nav.Item as="li">
                  <NavLink to="subscription-logs" className="nav-link">
                    Subscription Logs
                  </NavLink>
                </Nav.Item>
                <Nav.Item as="li">
                  <button
                    className="nav-link btn btn-link w-100"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col lg={9} md={8}>
            <Outlet />
          </Col>
        </Row>
      </Container>

      <CustomModal
        show={logoutModal}
        close={() => {
          setLogoutModal(false);
        }}
        disableClick={logoutMutation.isPending}
        action={logoutAdmin}
        title="Logout?"
        description="Are you sure you want to logout?"
      />
    </section>
  );
};

export default AssistantCoachSettings;

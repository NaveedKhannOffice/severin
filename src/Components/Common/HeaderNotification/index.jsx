import React from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";
import { calculateTimePassed, formatDate } from "../../../Utils/Utils";
import { FaBell } from "react-icons/fa6";

const HeaderNotification = ({
    notificationData = [],
    viewAllLink,
    onMarkAsRead, // Add this prop for handling read/unread
    onMarkAsUnread // Add this prop for handling unread
}) => {
    const notifications = Array.isArray(notificationData) ? notificationData : [];
    const unreadCount = notifications.filter(n => !n.read_at).length;

    // Format date and time
    const formatDateTime = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        // If less than 24 hours, show time
        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }

        // If more than 24 hours, show date
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    // Handle mark as read/unread
    const handleMarkAsRead = (e, notification) => {
        e.stopPropagation();
        e.preventDefault();

        if (onMarkAsRead && !notification.read_at) {
            onMarkAsRead(notification.id);
        }
    };

    const handleMarkAsUnread = (e, notification) => {
        e.stopPropagation();
        e.preventDefault();

        if (onMarkAsUnread && notification.read_at) {
            onMarkAsUnread(notification.id);
        }
    };

    return (
        <>
            <Dropdown className="header-notification-dropdown">
                <Dropdown.Toggle variant="" className="notification-toggle" id="dropdown-basic">
                    <FaBell />
                    {unreadCount > 0 && (
                        <span className="notification-badge">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="notification-menu">
                    <Card className="bg-transparent border-0">
                        <Card.Header className="notification-header bg-transparent d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-bold">Notifications</h6>
                            <span className="notification-count">{unreadCount} new</span>
                        </Card.Header>
                        <Card.Body className="notification-body">
                            {notifications.length > 0 ? (
                                notifications.slice(0, 5).map((notification) => (
                                    <Link
                                        className={`notification-item d-flex ${!notification.read_at ? "unread" : "read"}`}
                                        to={`/notifications`}
                                        key={notification.id}
                                    >
                                        <div className="notification-icon flex-shrink-0 align-self-top">
                                            <FaBell />
                                        </div>
                                        <div className="notification-content flex-grow-1">
                                            <Card.Title className="notification-title mb-1">
                                                {notification?.data?.title || 'Notification'}
                                            </Card.Title>
                                            <Card.Text className="notification-message">
                                                {notification?.data?.body ? (
                                                    notification.data.body.length > 40
                                                        ? `${notification.data.body.substring(0, 40)}...`
                                                        : notification.data.body
                                                ) : 'No message content'}
                                            </Card.Text>

                                            <div className="notification-meta d-flex justify-content-between">
                                                <div className="notification-meta">
                                                    <div className="notification-date">
                                                        {formatDate(notification?.created_at)}
                                                    </div>
                                                    <div className="notification-time">
                                                        {notification?.time}
                                                    </div>
                                                </div>


                                                {!notification.read_at ? (
                                                    <Button
                                                        variant="link"
                                                        className="notification-action-btn"
                                                        onClick={(e) => handleMarkAsRead(e, notification)}
                                                    >
                                                        Mark as Read
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="link"
                                                        className="notification-action-btn"
                                                        onClick={(e) => handleMarkAsUnread(e, notification)}
                                                    >
                                                        Mark as Unread
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="notification-empty text-center py-3">
                                    <p className="text-muted mb-0">No notifications</p>
                                </div>
                            )}
                        </Card.Body>
                        <Card.Footer className="notification-footer bg-transparent text-center p-0 border-0">
                            <Dropdown.Item as={Link} to={viewAllLink || `/notifications`} className="view-all-link">
                                View All Notifications
                            </Dropdown.Item>
                        </Card.Footer>
                    </Card>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

HeaderNotification.propTypes = {
    notificationData: PropTypes.array,
    viewAllLink: PropTypes.string,
    onMarkAsRead: PropTypes.func,
    onMarkAsUnread: PropTypes.func,
};

export default HeaderNotification;
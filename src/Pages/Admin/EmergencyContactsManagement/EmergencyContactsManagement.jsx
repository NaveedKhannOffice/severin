import React, { useEffect, useState } from "react";
// import EmergencyContactsCard from "../../../Components/EmergencyContactsCard/EmergencyContactsCard";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import { contactsData } from "../../../Config/data";
import withModal from "../../../HOC/withModal";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { deleteData, getAll } from "../../../Services/Api";

const EmergencyContactsManagement = ({ showModal }) => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const { startSubmitting, stopSubmitting } = useFormStatus();
  const fetchEmergencyContacts = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/emergencynumbers`;
      const response = await getAll(url);
      if (response.status) {
        setContacts(response?.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      stopSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    showModal(
      "Delete Emergency Contact",
      "Are you sure you want to delete this emergency contact?",
      () => onConfirmStatusChange(id)
    );
  };

  const onConfirmStatusChange = async (id) => {
    const response = await deleteData(`/admin/emergencynumbers/${id}`);
    if (response.status) {
      showModal(
        "Successful",
        "Emergency Contact has been deleted successfully!",
        null,
        true
      );
      fetchEmergencyContacts();
      stopSubmitting();
    }

  };

  const handleEdit = (id) => {
    navigate(`${id}/edit`);
  };
  useEffect(() => {
    fetchEmergencyContacts();
  }, []);
  return (
    <DashboardLayout pageTitle="Emergency Contacts Management">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2 className="mainTitle my-4">Emergency Contacts Management</h2>
            <div className="dashCard my-4">
              <div className="contact-grid">
                <div className="row">
                  {contacts.map((contact) => (
                    <div className="col-md-6 col-xl-4 mb-3" key={contact.id}>
                      {/* <EmergencyContactsCard
                        contact={contact}
                        onDelete={() => handleDelete(contact.id)}
                        onEdit={() => handleEdit(contact.id)}
                      /> */}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <Link to={"add"} className="site-btn primary-btn text-decoration-none">
                  Add
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(EmergencyContactsManagement);

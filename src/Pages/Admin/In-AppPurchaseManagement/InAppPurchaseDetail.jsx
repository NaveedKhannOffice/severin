import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import MedicalImage from "../../../Assets/images/medical-health.png";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../Components/Common/BackButton";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { inAppPurchaseManagementData } from "../../../Config/data";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import { getDetails, post } from "../../../Services/Api";
const InAppPurchaseDetail = ({ showModal }) => {
  const { id } = useParams();
  const [purchaseData, setPurchaseData] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const getUser = async () => {
    const response = await getDetails(`/admin/inapppurchases/${id}`);
    if (response.status) {
      setPurchaseData(response?.data);
    }
  };
  useEffect(() => {
    getUser();
  }, [id]);

  // Handle status change
  const handleStatusChange = (e, userId) => {
    const newStatusValue = e;
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} Product`,
      `Are you sure you want to change this Product status to ${
        newStatusValue === "1" ? "Active" : "Inactive"
      }?`,
      () => onConfirmStatusChange(userId, newStatusValue)
    );
  };

  const onConfirmStatusChange = async (userId, newStatusValue) => {
    const response = await post(`/admin/inapppurchases/${id}/status`);
    if (response.status) {
      getUser();
      showModal(
        "Successful",
        `Product status has been changed to ${
          newStatusValue === "1" ? "Active" : "Inactive"
        } successfully.`,
        null,
        true
      );
    }
  };

  return (
    <DashboardLayout pageTitle="View Product Details">
      <div className="row my-3">
        <div className="col-12">
          <div className="d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">View Product Details</h2>
          </div>
        </div>
      </div>
      <div className="dashCard">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column flex-sm-row gap-3">
              <div className="flex-grow-1 d-flex justify-content-center flex-wrap justify-content-sm-between">
                <div className="file-wrapper ps-5 mb-3 mb-sm-0">
                  <div className="ps-5 ms-3">
                    {purchaseData?.file ? (
                      <a href={purchaseData?.file?.media_path} target="_blank">
                        {/* <img
                          src={MedicalImage}
                          alt="Uploaded document"
                          className="uploaded-img"
                        /> */}
                      </a>
                    ) : (
                      <p>No file uploaded yet</p>
                    )}
                  </div>
                  <p className="mb-0 font-medium">{purchaseData?.title}</p>
                </div>

                {/* Status Update Section */}
                <div className="profile-status d-flex align-items-end flex-column gap-3">
                  <div className="status-action">
                    <Select
                      className={`tabel-select status${purchaseData?.status}`}
                      id={`status${purchaseData?.id}`}
                      name="status"
                      label="Status:"
                      value={purchaseData?.status}
                      onChange={(e) => handleStatusChange(e, purchaseData?.id)}
                      isInputNeeded={false}
                    >
                      {statusOptions}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashCard mt-3">
        <div className="row">
          <div className="col-md-10 col-lg-11 col-xl-10 col-xxl-8">
            <div className="row">
              {[
                { label: "Product Title", value: purchaseData?.title },
                { label: "price", value: `$${purchaseData?.amount}` },
                { label: "Description", value: purchaseData?.description },
              ].map(({ label, value }) => (
                <div
                  className={`col-md-4 mb-4 ${
                    label === "Description" && "col-md-10 col-lg-10"
                  }`}
                  key={label}
                >
                  <h4 className="secondaryLabel">{label}</h4>
                  <p className="secondaryText wrapText mb-0">{value}</p>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-12">
                <Link
                  to={`edit`}
                  className="site-btn primary-btn text-decoration-none px-5"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(InAppPurchaseDetail);

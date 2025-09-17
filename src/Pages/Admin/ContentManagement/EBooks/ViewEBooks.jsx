import { useEffect, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../../Components/Common/BackButton";
import CustomButton from "../../../../Components/Common/CustomButton";
import { eBooksData } from "../../../../Config/data";
import withModal from "../../../../HOC/withModal";
import { isNullOrEmpty } from "../../../../Utils/helper";
import { Select } from "../../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../../Config/TableStatus";
import { deleteData, getDetails, post } from "../../../../Services/Api";

const ViewEBooks = ({ showModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eBook, setEBook] = useState({});
  const getEBook = async () => {
    const response = await getDetails(`/admin/ebooks/${id}`);
    if (response) {
      setEBook(response?.data);
    }
  };
  useEffect(() => {
    getEBook();
  }, [id]);

  const handleRemove = (id) => {
    // Open the modal for confirmation
    showModal(
      `Remove E-Book`,
      `Are you sure you want to remove this E-Book?`,
      () => onConfirmRemove(id)
    );
  };
  const onConfirmRemove = async (id) => {
    const response = await deleteData(`/admin/ebooks/${id}`);
    if (response) {
      showModal(
        "Successful",
        `This E-Book has been removed successfully!`,
        () => navigate(`/admin/content-management?tab=eBook`),
        true
      );
    }
  };

  const handleStatusChange = (e) => {
    const newStatusValue = e;
    // Open the modal for confirmation
    showModal(
      `${newStatusValue === "1" ? "Active" : "Inactive"} E-Book`,
      `Are you sure you want to ${
        newStatusValue === "1" ? "Activate" : "Inactivate"
      } this E-Book?`,
      () => onConfirmStatusChange(newStatusValue)
    );
  };

  // Confirm status change and update the state
  const onConfirmStatusChange = async (newStatusValue) => {
    const response = await post(`/admin/ebooks/${id}/status`);
    if (response.status) {
      getEBook();
      showModal(
        "Successful",
        `This E-Book has been ${
          newStatusValue === "1" ? "Activated" : "Inactivated"
        } successfully!`,
        null,
        true
      );
    }
  };

  if (isNullOrEmpty(eBook)) {
    return (
      <DashboardLayout pageTitle="View E-Book">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton url={`/admin/content-management?tab=eBook`} />
              <h2 className="mainTitle mb-0">View E-Book Details</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">loading...</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="View E-Book">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton url={`/admin/content-management?tab=eBook`} />
            <h2 className="mainTitle mb-0">View E-Book Details</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <h4 className="secondaryLabel">E-Book Title</h4>
                  <p className="secondaryText wrapText mb-0">{eBook?.title}</p>
                </div>
                <div className="col-12 col-sm-4 d-flex mt-3 mt-sm-0 justify-content-end">
                  <Select
                    className={`tabel-select status${eBook?.status}`}
                    id={`status${eBook?.id}`}
                    name="status"
                    label="Status:"
                    value={eBook?.status}
                    onChange={(e) => handleStatusChange(e)}
                    isInputNeeded={false}
                  >
                    {statusOptions}
                  </Select>
                </div>
                <div className="col-12 my-4">
                  {eBook.category === "premium" ? (
                    <div className="mb-4">
                      <IoCheckmarkSharp size={24} color="green" />
                      <p className="ms-2 d-inline secondaryText fw-bold">
                        For Premium
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <IoCheckmarkSharp size={24} color="green" />
                      <p className="ms-2 d-inline secondaryText fw-bold">
                        For Free
                      </p>
                    </div>
                  )}
                  {eBook?.image && (
                    <img
                      className="containedImg roundedBorders"
                      src={eBook?.image?.media_path}
                    />
                  )}
                </div>
                <div className="col-12">
                  <p className="secondaryLabel mb-0">{eBook.description}</p>
                </div>
                <div className="col-12 mt-4">
                  <h4 className="secondaryText">E-Book</h4>
                  <object
                    data={eBook?.file?.media_path}
                    type="application/pdf"
                    width="100%"
                    height="800px"
                  >
                    <p>
                      If the pdf doesn't load, click{" "}
                      <a href={eBook.file?.media_path}> this link!</a>
                    </p>
                  </object>
                </div>
              </div>
              <div className="mt-4 mb-5 d-flex gap-3">
                <Link
                  className="site-btn primary-btn text-decoration-none"
                  to={"edit"}
                >
                  Edit
                </Link>
                <CustomButton
                  className="site-btn secondary-btn text-decoration-none"
                  onClick={() => handleRemove(eBook.id)}
                >
                  Remove
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ViewEBooks);

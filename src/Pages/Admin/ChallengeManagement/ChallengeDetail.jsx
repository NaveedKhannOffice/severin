import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BackButton from "../../../Components/Common/BackButton";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import { isNullOrEmpty } from "../../../Utils/helper";
import { challengeData } from "../../../Config/data";
import { getDetails } from "../../../Services/Api";
const ChallengeDetail = ({ showModal }) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  const getRefer = async () => {
    // const response = challengeData.detail.data.find((e) => e.id === Number(id));

    const response = await getDetails(`/admin/challenges/${id}`);
    if (response.status) {
      // setDetailData(response.detail);
      setDetailData(response?.data);
    }
  };

  useEffect(() => {
    getRefer();
  }, [id]);

  // Handle status change
  const handleStatusChange = (id) => {
    showModal(
      `${detailData?.status ? "Deactivate challenge" : "Activate challenge"}`,
      `Are you sure you want to ${
        detailData?.status ? "deactivate" : "activate"
      } this challenge?`,
      () => updateStatus(id)
    );
  };

  const updateStatus = async (challengeId) => {
    try {
      const response = await getDetails(
        `/admin/challenges/${challengeId}/status`
      );

      if (response.status) {
        setDetailData((prev) => ({
          ...prev,
          status: !prev.status, // Toggle the status locally
        }));
        showModal(
          "Successful",
          `Challenge status has been toggled successfully!`,
          null,
          true
        );
        getRefer();
      }
    } catch (err) {
      showModal("Error", "Failed to update status", null, true);
    }
  };

  if (isNullOrEmpty(detailData)) {
    return (
      <DashboardLayout pageTitle="Challenge Detail">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Challenge Detail</h2>
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
    <DashboardLayout pageTitle="View Challenge">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">View Challenge</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <h4 className="secondaryLabel">challenge title:</h4>
                  <p className="secondaryText wrapText mb-0">
                    {detailData?.title}
                  </p>
                </div>
                <div className="col-12 col-sm-4 d-flex mt-3 mt-sm-0 justify-content-end">
                  <Select
                    className={`tabel-select status${detailData?.status}`}
                    id={`status${detailData?.id}`}
                    name="status"
                    label="Status:"
                    value={detailData?.status}
                    onChange={() => handleStatusChange(detailData?.id)}
                    isInputNeeded={false}
                  >
                    {statusOptions}
                  </Select>
                </div>
              </div>
              <div className="row mb-3">
                {/* <div className="col-12 mb-4">
                           <h4 className="secondaryLabel">challenge title:</h4>
                           <p className="secondaryText wrapText mb-0">{detailData?.title}</p>
                        </div> */}
                <div className="col-12 mb-4">
                  <h4 className="secondaryLabel">challenge Type:</h4>
                  <p className="secondaryText wrapText mb-0">
                    {detailData?.type}
                  </p>
                </div>
                <div className="col-12 mb-4">
                  <h4 className="secondaryLabel">challenge Description:</h4>
                  <p className="secondaryText wrapText mb-0">
                    {detailData?.description}
                  </p>
                </div>
                <div className="col-12 mb-4">
                  <h4 className="secondaryLabel">Timing:</h4>
                  <p className="secondaryText wrapText mb-0">
                    {detailData?.from} To {detailData?.to}
                  </p>
                </div>
                <div className="col-12 mb-4">
                  <h4 className="secondaryLabel">Badge Type To Give Reward:</h4>
                  <p className="secondaryText wrapText mb-0">
                    {detailData?.badge_type}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="mt-4 mb-5">
                     <Link className="site-btn primary-btn text-decoration-none" to={`/admin/challenge-management/${detailData?.id}/edit`}>
                        Edit
                     </Link>
                  </div> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ChallengeDetail);

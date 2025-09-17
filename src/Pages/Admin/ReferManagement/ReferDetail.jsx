// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { Link } from "react-router-dom";
// import BackButton from "../../../Components/Common/BackButton";
// import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
// import { Select } from "../../../Components/Common/FormElements/SelectInput";
// import { statusOptions } from "../../../Config/TableStatus";
// import withModal from "../../../HOC/withModal";
// import { isNullOrEmpty } from "../../../Utils/helper";
// import { referData } from "../../../Config/data";
// import "./style.css";
// const ReferDetail = ({ showModal }) => {

//    const { id } = useParams();
//    const [detailData, setDetailData] = useState({});

//    useEffect(() => {
//       const getRefer = async () => {
//          const response = referData.detail.data.find((e) => e.id === Number(id));

//          // const response = await getDetails(`/admin-api/users/${id}`);
//          if (response) {
//             // setDetailData(response.detail);
//             setDetailData(response);
//          }
//       };
//       getRefer();
//    }, [id]);

//    // Handle status change
//    const handleStatusChange = (id, status) => {
//       showModal(
//          ` ${detailData.status ? "Inactive refer" : "active refer"}`,
//          ` Are you sure you want to ${detailData.status ? "Inactivate" : "Activate"} this Refer?`,
//          () => updateStatus(status, id)
//       );
//    };

//    // Second Modal
//    const updateStatus = async (status, id) => {
//       showModal("Succesful", `Refer has been ${detailData.status ? "inactivated" : "activated"} successfully!`, null, true);
//    };

//    if (isNullOrEmpty(detailData)) {
//       return (
//          <DashboardLayout pageTitle="Refer Detail">
//             <div className="container-fluid">
//                <div className="row mb-5">
//                   <div className="col-12 my-4 d-flex">
//                      <BackButton />
//                      <h2 className="mainTitle mb-0">Refer Detail</h2>
//                   </div>
//                   <div className="col-12">
//                      <div className="dashCard mb-4">loading...</div>
//                   </div>
//                </div>
//             </div>
//          </DashboardLayout>
//       );
//    }

//    return (
//       <DashboardLayout pageTitle="Refer Detail">
//          <div className="container-fluid">
//             <div className="row mb-5">
//                <div className="col-12 my-4 d-flex">
//                   <BackButton />
//                   <h2 className="mainTitle mb-0">Refer Detail</h2>
//                </div>
//                <div className="col-12">
//                   <div className="dashCard mb-4">
//                      <div className="row mb-3">
//                         <div className="col-12 col-sm-8">
//                            <h4 className="secondaryLabel">choose new user:</h4>
//                            <p className="secondaryText wrapText mb-0">{detailData?.choose_new_user}</p>
//                         </div>
//                         <div className="col-12 col-sm-4 d-flex mt-3 mt-sm-0 justify-content-end">
//                            <Select
//                               className={`tabel-select status${detailData?.status}`}
//                               id={`status${detailData?.id}`}
//                               name="status"
//                               label="Status:"
//                               value={detailData?.status}
//                               onChange={(e) => handleStatusChange(e, detailData?.id)}
//                               isInputNeeded={false}
//                            >
//                               {statusOptions}
//                            </Select>
//                         </div>
//                      </div>
//                   </div>
//                   <div className="dashCard mb-4">
//                      <div className="row">
//                         <div className="col-12">
//                            <h2 className="dashCardTitle text-capitalize">In app gift</h2>
//                         </div>
//                         <div className="row">
//                            <div className="col-sm-6">
//                               <div className="row">
//                                  <div className="col-12 my-3 ">
//                                     <div className="image-image-wrapper text-center max-width">
//                                        <img className="my-2" src={detailData?.in_app_gift?.file_icon} alt="" />
//                                        <h4 className="secondaryLabel">{detailData?.in_app_gift?.icon_name}</h4>
//                                     </div>
//                                  </div>
//                                  <div className="col-12 my-3">
//                                     <h4 className="secondaryLabel">product title:</h4>
//                                     <p className="secondaryText wrapText mb-0">{detailData?.in_app_gift?.product_title}</p>
//                                  </div>
//                                  <div className="col-12 mb-3">
//                                     <h4 className="secondaryLabel">description:</h4>
//                                     <p className="secondaryText wrapText mb-0">{detailData?.in_app_gift?.description}</p>
//                                  </div>
//                               </div>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                   <div className="dashCard mb-4">
//                      <div className="row">
//                         <div className="col-12">
//                            <h2 className="dashCardTitle text-capitalize">Voucher</h2>
//                         </div>
//                         <div className="row">
//                            <div className="col-sm-6">
//                               <div className="row">
//                                  <div className="col-12 my-3 ">
//                                     <div className="image-image-wrapper text-center max-width">
//                                        <img className="my-2" src={detailData?.voucher?.voucher_image} alt="" />
//                                        <h4 className="secondaryLabel">{detailData?.voucher?.icon_name}</h4>
//                                     </div>
//                                  </div>
//                                  <div className="col-12 my-3">
//                                     <h4 className="secondaryLabel">product title:</h4>
//                                     <p className="secondaryText wrapText mb-0">{detailData?.voucher?.voucher_title}</p>
//                                  </div>
//                                  <div className="col-12 mb-3">
//                                     <h4 className="secondaryLabel">description:</h4>
//                                     <p className="secondaryText wrapText mb-0">{detailData?.voucher?.description}</p>
//                                  </div>
//                               </div>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                   <div className="mt-4 mb-5">
//                      <Link className="site-btn primary-btn text-decoration-none" to={`/admin/refer-management/${detailData?.id}/edit`}>
//                         Edit Refer
//                      </Link>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </DashboardLayout>
//    );
// };

// export default withModal(ReferDetail);

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BackButton from "../../../Components/Common/BackButton";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import { Select } from "../../../Components/Common/FormElements/SelectInput";
import { statusOptions } from "../../../Config/TableStatus";
import withModal from "../../../HOC/withModal";
import { isNullOrEmpty } from "../../../Utils/helper";
import { getDetails, post } from "../../../Services/Api";
import "./style.css";
// import fileIcon from "../../../Assets/images/medical-health.png";

const ReferDetail = ({ showModal }) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRefer = async () => {
    try {
      setLoading(true);
      const response = await getDetails(`/admin/refer-rewards/${id}`);
      if (response.status) {
        const formattedData = {
          ...response.data,
          in_app_gift: response.data.in_app_gifts?.[0] || null,
          voucher: response.data.vouchers?.[0] || null,
        };
        setDetailData(formattedData);
        console.log(formattedData, "gggg");
      } else {
        setError("Failed to load refer details");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      showModal("Error", "Failed to fetch refer details", null, true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRefer();
  }, [id]);

  const handleStatusChange = (newStatus, rewardId) => {
    showModal(
      `${newStatus === "1" ? "Activate" : "Deactivate"} Refer`,
      `Are you sure you want to ${
        newStatus === "1" ? "activate" : "deactivate"
      } this Refer?`,
      () => updateStatus(rewardId, newStatus)
    );
  };

  const updateStatus = async (rewardId, newStatus) => {
    try {
      const response = await post(`/admin/refer-rewards/${rewardId}/status`, {
        status: newStatus,
      });

      if (response.data.status) {
        setDetailData((prev) => ({
          ...prev,
          status: newStatus,
        }));
        showModal(
          "Successful",
          `Refer has been ${
            newStatus === "1" ? "activated" : "deactivated"
          } successfully!`,
          null,
          true
        );
      }
    } catch (err) {
      showModal("Error", "Failed to update status", null, true);
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Refer Detail">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Refer Detail</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">Loading...</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || isNullOrEmpty(detailData)) {
    return (
      <DashboardLayout pageTitle="Refer Detail">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton />
              <h2 className="mainTitle mb-0">Refer Detail</h2>
            </div>
            <div className="col-12">
              <div className="dashCard mb-4">{error || "No data found"}</div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Refer Detail">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton />
            <h2 className="mainTitle mb-0">Refer Detail</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <h4 className="secondaryLabel">Required Referrals:</h4>
                  <p className="secondaryText wrapText mb-0">
                    {detailData.required_referrals}
                  </p>
                </div>
                <div className="col-12 col-sm-4 d-flex mt-3 mt-sm-0 justify-content-end">
                  <Select
                    className={`tabel-select status${detailData.status}`}
                    id={`status${detailData.id}`}
                    name="status"
                    label="Status:"
                    value={detailData.status}
                    onChange={(e) => handleStatusChange(e, detailData.id)}
                    isInputNeeded={false}
                  >
                    {statusOptions}
                  </Select>
                </div>
              </div>
            </div>

            {detailData.in_app_gift && (
              <div className="dashCard mb-4">
                <div className="row">
                  <div className="col-12">
                    <h2 className="dashCardTitle text-capitalize">
                      In App Gift
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-12 my-3">
                          
                        </div>
                        <div className="col-12 my-3">
                          <h4 className="secondaryLabel">Product Title:</h4>
                          <p className="secondaryText wrapText mb-0">
                            {detailData.in_app_gift.product_title}
                          </p>
                        </div>
                        <div className="col-12 mb-3">
                          <h4 className="secondaryLabel">Description:</h4>
                          <p className="secondaryText wrapText mb-0">
                            {detailData.in_app_gift.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {detailData.voucher && (
              <div className="dashCard mb-4">
                <div className="row">
                  <div className="col-12">
                    <h2 className="dashCardTitle text-capitalize">Voucher</h2>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-12 my-3">
                          <div className="image-image-wrapper text-center max-width">
                            {detailData.voucher.media?.[0]?.media_path && (
                              <img
                                className="my-2"
                                src={detailData.voucher.media[0].media_path}
                                alt={detailData.voucher.title}
                              />
                            )}
                            <h4 className="secondaryLabel">
                              {detailData.voucher.title}
                            </h4>
                          </div>
                        </div>
                        <div className="col-12 my-3">
                          <h4 className="secondaryLabel">Voucher Title:</h4>
                          <p className="secondaryText wrapText mb-0">
                            {detailData.voucher.title}
                          </p>
                        </div>
                        <div className="col-12 mb-3">
                          <h4 className="secondaryLabel">Description:</h4>
                          <p className="secondaryText wrapText mb-0">
                            {detailData.voucher.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="mt-4 mb-5">
                     <Link
                        className="site-btn primary-btn text-decoration-none"
                        to={`/admin/refer-management/${detailData.id}/edit`}
                        state={{ rewardData: detailData }}
                     >
                        Edit Refer
                     </Link>
                  </div> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(ReferDetail);

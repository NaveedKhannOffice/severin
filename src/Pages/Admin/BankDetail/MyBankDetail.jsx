import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import withModal from "../../../HOC/withModal";
import { isNullOrEmpty } from "../../../Utils/helper";
// import { accountInfo } from "../../../Config/data";
// import BankIcon from "../../../Assets/images/bank-icon.png";
const MyBankDetail = () => {
  const [bankData, setBankData] = useState({});

  const location = useLocation();
  useEffect(() => {
    // const getBankApiData = async () => {
    //   const response = accountInfo;
    //   if (response) {
    //     setBankData(response);
    //   }
    // };
    // getBankApiData();
    const state = location.state;
    console.log(state);
    setBankData(state);
  }, []);

  return (
    <DashboardLayout pageTitle="My Bank Details">
      <div className="row my-3">
        <div className="col-12">
          <div className="d-flex">
            <h2 className="mainTitle mb-0">My Bank Details</h2>
          </div>
        </div>
      </div>
      {isNullOrEmpty(bankData) ? (
        <div className="dashCard">
          <Link to={"/admin/add-bank-details"}>
            <div className="bankCard">
              <div className="d-flex flex-column justify-content-center">
                {/* <img src={BankIcon} alt="bankicon" className="img-fluid" /> */}
                <p className="mb-0 text-decoration-underline blackColor mt-2">Add bank details</p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="dashCard mt-3">
          <div className="row">
            <div className="col-md-10 col-lg-8 col-xl-7 col-xxl-5">
              <div className="row">
                {[
                  { label: "Account holder name", value: bankData?.accountHolderName },
                  { label: "Account Type", value: bankData?.accountType },
                  { label: "Bank Name", value: bankData?.bankName },
                  { label: "Routing Number", value: bankData?.routingNumber },
                  { label: "Account Number", value: bankData?.accountNumber },
                ].map(({ label, value }) => (
                  <div className={`col-sm-6 mb-4`} key={label}>
                    <h4 className="secondaryLabel">{label}</h4>
                    <p className="secondaryText wrapText mb-0">{value}</p>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-12">
                  <Link to={`edit`} className="site-btn primary-btn text-decoration-none px-5">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default withModal(MyBankDetail);

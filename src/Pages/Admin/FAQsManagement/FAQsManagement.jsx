import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import withModal from "../../../HOC/withModal";
import { isNullOrEmpty } from "../../../Utils/helper";
// import BankIcon from "../../../Assets/images/bank-icon.png";
import FaqAccordion from "./FaqAccordion";
import { faqs } from "../../../Config/data";
import { useFormStatus } from "../../../Hooks/useFormStatus";
import { getAll } from "../../../Services/Api";
const FAQsManagement = () => {
  const { startSubmitting, stopSubmitting } = useFormStatus();

  const [faqsData, setFaqsData] = useState({});
  const fetchFaqs = async () => {
    try {
      startSubmitting(true);
      const url = `/admin/faqs`;
      const response = await getAll(url);
      if (response.status) {
        setFaqsData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      stopSubmitting(false);
    }
  };
  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <DashboardLayout pageTitle="FAQs Management">
      <div className="row my-4">
        <div className="col-12">
          <h2 className="mainTitle mb-0">FAQs Management</h2>
        </div>
      </div>

      <div className="dashCard mt-3">
        <div className="row">
          <div className="col-12">
            {faqsData?.length ?
              <FaqAccordion role="admin" faqs={faqsData} fetchFaqs={fetchFaqs} />
              : <p className="mb-0">You haven’t added any FAQ yet, Click Below to Add</p>}
          </div>
          <div className="col-12">
            <Link to={`add`} className="site-btn primary-btn text-decoration-none px-5">
              Add
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withModal(FAQsManagement);

import { useEffect, useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../../../Components/Layouts/AdminLayout/DashboardLayout";
import BackButton from "../../../../Components/Common/BackButton";
import CustomButton from "../../../../Components/Common/CustomButton";
import { articlesData } from "../../../../Config/data";
import withModal from "../../../../HOC/withModal";
import { isNullOrEmpty } from "../../../../Utils/helper";
import { deleteData, getDetails } from "../../../../Services/Api";

const ViewArticles = ({ showModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const getArticle = async () => {
    const response = await getDetails(`/admin/articles/${id}`);
    if (response) {
      setArticle(response?.data);
    }
  };
  useEffect(() => {
    getArticle();
  }, [id]);
  const handleRemove = (id) => {
    showModal(
      `Remove article`,
      `Are you sure you want to remove this article?`,
      () => onConfirmRemove(id)
    );
  };
  const onConfirmRemove = async (id) => {
    const response = await deleteData(`/admin/articles/${id}`);
    if (response) {
      showModal(
        "Successful",
        `This article has been removed successfully!`,
        () => navigate(`/admin/content-management?tab=blogs`),
        true
      );
    }
  };

  if (isNullOrEmpty(article)) {
    return (
      <DashboardLayout pageTitle="View Article">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-12 my-4 d-flex">
              <BackButton url={`/admin/content-management?tab=blogs`} />
              <h2 className="mainTitle mb-0">View Article</h2>
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
    <DashboardLayout pageTitle="View Article">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 my-4 d-flex">
            <BackButton url={`/admin/content-management?tab=blogs`} />
            <h2 className="mainTitle mb-0">View Article</h2>
          </div>
          <div className="col-12">
            <div className="dashCard mb-4">
              <div className="row mb-3">
                <div className="col-12 col-sm-8">
                  <h4 className="secondaryLabel">Article Title</h4>
                  <p className="secondaryText wrapText mb-0">
                    {article?.title}
                  </p>
                </div>
                <div className="col-12 my-4">
                  {article.category === "premium" ? (
                    <div className="mb-4">
                      <IoCheckmarkSharp size={24} color="green" />
                      <p className="ms-2 d-inline secondaryText">For Premium</p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <IoCheckmarkSharp size={24} color="green" />
                      <p className="ms-2 d-inline secondaryText">For Free</p>
                    </div>
                  )}
                  {article?.banner && (
                    <img
                      className="containedImg roundedBorders"
                      src={article?.banner?.media_path}
                    />
                  )}
                </div>
                {/* <div className="col-12 ">
                  <p className="secondaryLabel mb-0">{article.content}</p>
                </div> */}
                <div className="col-12 mt-4">
                  <h4 className="secondaryText">Article Pdf</h4>
                  <object
                    data={article?.file?.media_path}
                    type="application/pdf"
                    width="100%"
                    height="800px"
                  >
                    <p>
                      If the pdf doesn't load, click{" "}
                      <a href={article?.file?.media_path}> this link!</a>
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
                  onClick={() => handleRemove(article.id)}
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

export default withModal(ViewArticles);

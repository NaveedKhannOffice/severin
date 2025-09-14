import { useNavigate } from "react-router";
import "./style.css";
import { FaArrowLeft } from "react-icons/fa6";


const BackButton = ({ url = "" }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="backButton" onClick={goBack}>
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;

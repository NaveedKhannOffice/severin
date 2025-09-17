import React, { useState } from "react";
import "./style.css";
import { Accordion, Card, Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaPlay } from "react-icons/fa6";
// import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../Components/Common/CustomButton";
import { CiEdit, CiTrash } from "react-icons/ci";
import withModal from "../../../HOC/withModal";
import { getDetails } from "../../../Services/Api";

const FaqAccordion = ({ role = "user", faqs, showModal, fetchFaqs }) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const handleDeleteFaq = (Id) => {
    showModal(`Delete Faq`, `Are you sure you wants to delete this Faq?`, () =>
      onConfirmDeleteFaq(Id)
    );
  };

  // Confirm status change and update the state
  const onConfirmDeleteFaq = async (id) => {
    const response = await getDetails(`/admin/faqs/${id}/delete/`);
    if (response.status) {
      fetchFaqs();
      showModal(
        "Successful",
        `this Faq has been deleted successfully!`,
        null,
        true
      );
    }
  };

  return (
    <Accordion activeKey={activeKey !== null ? activeKey.toString() : null}>
      {faqs.map((faq, index) => (
        <Card key={index} className="faq-card mb-4 mt-2">
          <Card.Header className="d-flex faq-header justify-content-between align-items-center">
            <div className="text-black">
              <b>Q: {faq.question}</b>
            </div>
            <div className="d-flex gap-2 gap-lg-3">
              {role == "admin" ? (
                <>
                  <CustomButton
                    className="notButton"
                    type="button"
                    onClick={() => {
                      navigate(`edit/${faq.id}`);
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center">
                      <span>
                        <CiEdit size={26} className="text-info" />
                      </span>
                      <span className="text-decoration-underline text-info">
                        Edit
                      </span>
                    </div>
                  </CustomButton>
                  <CustomButton
                    className="notButton"
                    pendingText="Removing..."
                    type="button"
                    onClick={() => {
                      handleDeleteFaq(faq.id);
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center">
                      <span>
                        <CiTrash size={26} color="#FF0000" />
                      </span>
                      <span
                        className="text-decoration-underline"
                        style={{ color: "#FF0000" }}
                      >
                        Remove
                      </span>
                    </div>
                  </CustomButton>
                </>
              ) : null}
              <Button
                onClick={() => handleToggle(index)}
                aria-expanded={activeKey === index}
                className={`faq - btn toggle - button ${
                  activeKey === index ? "open" : ""
                } `}
              >
                {activeKey === index ? (
                  <AiOutlineMinus size={22} fontWeight={600} />
                ) : (
                  <AiOutlinePlus size={22} fontWeight={600} />
                )}
              </Button>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <div className="answer-content accordion-content">
                {faq.type === "text" && (
                  <p className=" text-wrap">A: {faq.answer}</p>
                )}
                {faq.type === "image" && (
                  <img
                    src={faq?.image?.media_path}
                    alt="FAQ"
                    className="mt-3 faq-img"
                  />
                )}
                {faq.type === "video" && (
                  <div style={{ position: "relative" }}>
                    {faq?.video && (
                      <>
                        {/* <ReactPlayer
                          height={"100%"}
                          width={"100%"}
                          style={{ overflow: "hidden", objectFit: "fill" }}
                          controls={isPlaying}
                          playing={isPlaying}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          url={faq?.video?.media_path}
                        /> */}
                        {/* Conditionally show the FaPlay icon when the video is paused */}
                        {/* {!isPlaying && (
                          <div
                            onClick={handlePlayPause}
                            className="videoPlayButton"
                          >
                            <FaPlay className="ps-2" />
                          </div>
                        )} */}
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default withModal(FaqAccordion);

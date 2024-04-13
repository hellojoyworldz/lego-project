import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import "./ModalCard.style.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        {props.modalTitle && (
          <Modal.Title id="contained-modal-title-vcenter">
            {props.modalTitle}
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {props.contentTitle && <h4>{props.contentTitle}</h4>}
        {props.videodata && (
          <YouTube
            className="video-iframe"
            videoId={props.videodata}
            opts={{ playerVars: { autoplay: 1 } }}
          />
        )}
        {props.contentText && <p>{props.contentText}</p>}
      </Modal.Body>
    </Modal>
  );
}

const ModalCard = ({ title, videodata }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        {title}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        videodata={videodata}
      />
    </>
  );
};

export default ModalCard;

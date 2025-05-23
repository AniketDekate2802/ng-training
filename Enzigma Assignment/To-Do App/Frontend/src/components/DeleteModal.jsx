
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ show, onHide, onConfirm, task }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="bg-danger text-white">
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete task <strong>{task?.assignedTo}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>No</Button>
        <Button variant="warning" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

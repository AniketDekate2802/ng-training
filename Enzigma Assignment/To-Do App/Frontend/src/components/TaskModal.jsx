
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TaskModal = ({ show, onHide, onSave, task }) => {
  const [formData, setFormData] = useState({
    assignedTo: "",
    status: "Not Started",
    dueDate: "",
    priority: "Normal",
    description: ""
  });

  useEffect(() => {
    if (task) {
      setFormData({
        assignedTo: task.assignedTo || "",
        status: task.status || "Not Started",
        dueDate: task.dueDate?.split("T")[0] || "",
        priority: task.priority || "Normal",
        description: task.description || ""
      });
    } else {
      setFormData({
        assignedTo: "",
        status: "Not Started",
        dueDate: "",
        priority: "Normal",
        description: ""
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    const payload = task ? { ...task, ...formData } : formData;
    onSave(payload);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Priority</Form.Label>
            <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>Cancel</Button>
        <Button variant="success" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;

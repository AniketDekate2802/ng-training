
import React, { useEffect, useState } from "react";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
import DeleteModal from "./components/DeleteModal";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "../src/axiosConfig";

const handleSaveTask = async () => {
  try {
    const response = await axios.post("/tasks", taskData);
    console.log("Task saved:", response.data);
  } catch (error) {
    console.error("Error saving task:", error);
  }
};


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (task) => {
    if (task._id) {
      await axios.put(`/tasks/${task._id}`, task);
    } else {
      await axios.post("/tasks", task);
    }
    setShowTaskModal(false);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDeleteTask = async () => {
    await axios.delete(`/tasks/${taskToDelete._id}`);
    setShowDeleteModal(false);
    setTaskToDelete(null);
    fetchTasks();
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col><h4>Tasks</h4></Col>
        <Col className="text-end">
          <Button variant="warning" className="me-2" onClick={fetchTasks}>Refresh</Button>
          <Button variant="primary" onClick={() => setShowTaskModal(true)}>New Task</Button>
        </Col>
      </Row>
      <TaskTable
        tasks={tasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowTaskModal(true);
        }}
        onDelete={(task) => {
          setTaskToDelete(task);
          setShowDeleteModal(true);
        }}
      />
      <TaskModal
        show={showTaskModal}
        onHide={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
      <DeleteModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteTask}
        task={taskToDelete}
      />
    </Container>
  );
};

export default App;

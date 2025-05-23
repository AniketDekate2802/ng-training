
import React from "react";
import { Table, Dropdown } from "react-bootstrap";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td><input type="checkbox" /></td>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.dueDate?.split("T")[0]}</td>
            <td>{task.priority}</td>
            <td>{task.description}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle variant="light" size="sm">⋮</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => onEdit(task)}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => onDelete(task)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskTable;

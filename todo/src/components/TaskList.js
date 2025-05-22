import React, { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, [tasks]);

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/api/task/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ul className="list-disc pl-5">
      {tasks.map(task => (
        <li key={task.id} className="flex justify-between items-center mb-2">
          <span>{task.title}</span>
          <button className="text-red-500" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
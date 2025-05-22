import React, { useState } from 'react';

function TaskForm() {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task })
    });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;


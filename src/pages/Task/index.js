import React, { useEffect, useState } from 'react';
import './Task.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [error, setError] = useState(null);

  // Focus on input when editing starts
  useEffect(() => {
    if (editingTaskId !== null) {
      const input = document.getElementById(`edit-${editingTaskId}`);
      input?.focus();
    }
  }, [editingTaskId]);

  // Fetch tasks
  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => setError('⚠️ Failed to load tasks.'));
  }, []);

  // Add task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    if (tasks.some(t => t.text === newTask.trim())) {
      alert('⚠️ This task already exists.');
      return;
    }

    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTask }),
    })
      .then(res => res.json())
      .then(task => {
        setTasks([...tasks, task]);
        setNewTask('');
      })
      .catch(() => setError('⚠️ Failed to add task.'));
  };

  // Delete task
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    fetch(`http://localhost:8000/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
      .catch(() => setError('⚠️ Failed to delete task.'));
  };

  // Update task
  const handleUpdate = (id) => {
    if (editingText.trim() === '') return;

    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editingText }),
    })
      .then(() => {
        setTasks(tasks.map(t => (t.id === id ? { ...t, text: editingText } : t)));
        setEditingTaskId(null);
        setEditingText('');
      })
      .catch(() => setError('⚠️ Failed to update task.'));
  };

  return (
    <div className="page-layout">
      <Header customClass="header-light" />
      <div className="task-page">
        <h2 className="task-header">My Tasks</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            maxLength={100}
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask} disabled={!newTask.trim()}>
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Start by adding one!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                {editingTaskId === task.id ? (
                  <>
                    <input
                      id={`edit-${task.id}`}
                      type="text"
                      maxLength={100}
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                    />
                    <button
                      onClick={() => handleUpdate(task.id)}
                      disabled={!editingText.trim()}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingText(task.text);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TaskPage;

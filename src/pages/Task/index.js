// import React, { useEffect, useState } from 'react';
// import './Task.css';
// import Footer from '../../components/Footer';
// import Header from '../../components/Header';

// const Task = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const fetchTasks = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('http://localhost/route2/project/api/notes/my_notes.php', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to fetch tasks');
//       const data = await res.json();
//       setTasks(data);
//     } catch (err) {
//       setError('⚠️ Failed to load tasks.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleAddTask = async () => {
//     if (newTask.trim() === '') return;

//     try {
//       const res = await fetch('http://localhost/route2/project/api/notes/add.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content: newTask }),
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setNewTask('');
//         fetchTasks();
//       } else {
//         console.error("❌ Add Task Error:", result);
//         setError(result.error || '⚠️ Failed to add task.');

//       }
//     } catch (err) {
//       setError('⚠️ Failed to add task.');
//     }
//   };

//   const handleDelete = async (noteId) => {
//     try {
//       const res = await fetch(`http://localhost/route2/project/api/notes/delete.php?note_id=${noteId}`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       const result = await res.json();
//       if (res.ok) {
//         fetchTasks();
//       } else {
//         setError(result.error || '⚠️ Failed to delete task.');
//       }
//     } catch (err) {
//       setError('⚠️ Failed to delete task.');
//     }
//   };
  

//   return (
//     <div className="page-layout">
//       <Header customClass="header-light" />
//       <div className="task-page">
//         <h2 className="task-header">My Tasks</h2>

//         {error && <div className="error-message">{error}</div>}
//         {loading && <div className="loading-message">⏳ Loading tasks...</div>}

//         <div className="task-input">
//           <input
//             type="text"
//             placeholder="Enter a new task..."
//             maxLength={100}
//             value={newTask}
//             onChange={e => setNewTask(e.target.value)}
//           />
//           <button onClick={handleAddTask} disabled={!newTask.trim()}>
//             Add
//           </button>
//         </div>

//         {!loading && tasks.length === 0 ? (
//           <p className="no-tasks">No tasks yet. Start by adding one!</p>
//         ) : (
//           <ul className="task-list">
//             {tasks.map(task => (
//               <li key={task.note_id} className="task-item">
//                 <span>{task.content}</span>
//                 <button onClick={() => handleDelete(task.note_id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Task;
import React, { useEffect, useState } from 'react';
import './Task.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost/route2/project/api/notes/my_notes.php', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('⚠️ Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddOrEditTask = async () => {
    if (newTask.trim() === '') return;

    const url = editingTaskId
      ? `http://localhost/route2/project/api/notes/edit.php?note_id=${editingTaskId}`
      : 'http://localhost/route2/project/api/notes/add.php';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newTask }),
      });

      const result = await res.json();
      if (res.ok) {
        setNewTask('');
        setEditingTaskId(null);
        fetchTasks();
      } else {
        console.error("❌ Task Error:", result);
        setError(result.error || '⚠️ Failed to process task.');
      }
    } catch (err) {
      setError('⚠️ Failed to process task.');
    }
  };

  const handleEdit = (task) => {
    setNewTask(task.content);
    setEditingTaskId(task.note_id);
  };

  const handleDelete = async (noteId) => {
    try {
      const res = await fetch(`http://localhost/route2/project/api/notes/delete.php?note_id=${noteId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        setError(result.error || '⚠️ Failed to delete task.');
      }
    } catch (err) {
      setError('⚠️ Failed to delete task.');
    }
  };

  return (
    <div className="page-layout">
      <Header customClass="header-light" />
      <div className="task-page">
        <h2 className="task-header">My Tasks</h2>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">⏳ Loading tasks...</div>}

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            maxLength={100}
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <button onClick={handleAddOrEditTask} disabled={!newTask.trim()}>
            {editingTaskId ? 'Update' : 'Add'}
          </button>
        </div>

        {!loading && tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Start by adding one!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.note_id} className="task-item">
                <span>{task.content}</span>
                <div>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.note_id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Task;

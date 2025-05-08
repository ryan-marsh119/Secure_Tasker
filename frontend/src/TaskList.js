import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Function that fetches and renders a list of tasks from my API  
const TaskList = () => {

    // tasks - array used to store the lists from API. initialized to empty list
    const [tasks, setTasks] = useState([]);

    // error - string used to store error message. initialized to null
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    // Create new Tasks

    const [showAddTask, setAddTask] = useState(false);

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');

    const [completed, setCompleted] = useState(false);

    const [taskMessage, setTaskMessage] = useState('');

    // Edit new Tasks

    const [editTaskId, setEditTaskId] = useState(null);

    const [editTitle, setEditTitle] = useState('');

    const [editDescription, setEditDescription] = useState('');

    const [editCompleted, setEditCompleted] = useState(false);

    const fetchTasks = async () => {

        const token = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get('http://localhost:8000/api/tasks/', {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            });
            setTasks(response.data);

        } catch (err) {
            // console.log(err.response?.status);
            if (err.response?.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
                return;
            }
            if (err.response?.status === 500 && err.response?.data?.detail === "Failed to decrypt task data."){
                setError("Failed to decrypt tasks. Please try logging in again.");
                localStorage.removeItem('accessToken');
                navigate('/login');
                return;
            }
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();

        setTaskMessage('');

        const token = localStorage.getItem('accessToken');

        try{
            const response = await axios.post('http://localhost:8000/api/tasks/',
                {"title": title, "description": description, "completed": completed},{
                headers:{
                    Authorization: 'Bearer ' + token
                }});
            console.log('Task added: ', response.data);
            setTaskMessage('Task added.');
            setTitle('');
            setDescription('');
            setCompleted(false);
            setAddTask(false);
            await fetchTasks();

        } catch (err) {
            const errors = err.response?.data;
            const errorList = [];
            for(const key in errors){
                if(errors.hasOwnProperty(key)) {
                    const value = errors[key];
                    errorList.push(value);
                }
            }
            let errorMessage = errorList.join('; ');

            console.log('Total amount of errors: ', errorMessage);
            setTaskMessage('Add task failed: ' + (errorMessage || 'An error occurred'));
            setTitle('');
            setDescription('');
            setCompleted(false);
        }
    };

    // Working on PUT calls.

    const handleEditClick = async (task) => {
        setEditTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditCompleted(task.completed);
    }

    const handleUpdateTask = async (e, id) =>{

        e.preventDefault();

        setTaskMessage('');

        const token = localStorage.getItem('accessToken');

        const path = `http://localhost:8000/api/tasks/${id}/`;

        try {
            const response = await axios.put(path, {
                    "title": editTitle, "description": editDescription, "completed": editCompleted}, {
                    headers:{
                        Authorization: 'Bearer ' + token
            }});
            console.log('Task edited: ', response.data);
            setTaskMessage('Task edited.');
            cancelEdit();
            await fetchTasks();

        } catch (err) {
            const errors = err.response?.data;
            const errorList = [];
            for(const key in errors){
                if(errors.hasOwnProperty(key)) {
                    const value = errors[key];
                    errorList.push(value);
                }
            }
            let errorMessage = errorList.join('; ');

            console.log('Edit task failed: ', errorMessage || 'An error occurred');
            setTaskMessage('Edit task failed: ' + (errorMessage || 'An error occurred'));
            cancelEdit();
        }
 
    }

    const handleDelete = async (e, id) =>{
        e.preventDefault();

        setTaskMessage('');

        const token = localStorage.getItem('accessToken');

        const path = `http://localhost:8000/api/tasks/${id}/`;

        try{
            const response = await axios.delete(path, {
                    headers:{
                        Authorization: 'Bearer ' + token
            }});
            console.log('Task deleted: ', response.data);
            setTaskMessage('Task deleted.')
            cancelEdit();
            await fetchTasks();

        } catch(err) {
            const errors = err.response?.data;
            const errorList = [];
            for(const key in errors){
                if(errors.hasOwnProperty(key)){
                    const value = errors[key];
                    errorList.push(value);
                }
            }
            let errorMessage = errorList.join('; ');

            console.log('Delete task failed: ', errorMessage || 'An error occurred');
            setTaskMessage('Deletetask failed: ' + (errorMessage || 'An error occurred'));
            cancelEdit();
        }

    };

    const cancelAdd = () => {
        setTitle('');
        setDescription('');
        setCompleted(false);
        setTaskMessage('');
        setAddTask(false);
    };

    const cancelEdit = () => {
        setEditTitle('');
        setEditDescription('');
        setEditCompleted(false);
        setEditTaskId(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const showForm = () =>{
        setTaskMessage('');
        setAddTask(!showAddTask);
    };

    useEffect(() =>{
        fetchTasks();
    }, [navigate]); // Empty dependency array means this runs once on mount.

    if (error) {
        return <div>{error}</div>;
    }
    return(
        <div>
            <h1>Tasks</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                tasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (

                    <ul>
                        {tasks.map(task => (
                            <li key = {task.id}>
                                {editTaskId === task.id ? (
                                    <form className = "edit-task-form"
                                        style={{display:'flex', flexDirection:'column', gap:'10px', maxWidth:'300px', margin:'0 auto'}}
                                        onSubmit={(e) => handleUpdateTask(e, editTaskId)}>
                                        <label>Title:</label>
                                        <input
                                            type='text'
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <label>Description:</label>
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        ></textarea>
                                        <label>
                                            <input 
                                                type="checkbox"
                                                checked={editCompleted}
                                                onChange={(e) => setEditCompleted(e.target.checked)}
                                            />
                                            Completed
                                        </label>
                                        <button type="submit">Save</button>
                                        <button type="button" onClick={(e) => handleDelete(e, editTaskId)}>Delete</button>
                                        <button type="button" onClick={cancelEdit}>Cancel</button>
                                    </form>
                                ) : (
                                    <>
                                        {task.title}
                                        <button onClick={() => handleEditClick(task)}>Edit</button>
                                    </> 
                                )}
                            </li>
                        ))}
                    </ul>
                )
            )}
            <button onClick={showForm}>Add Task</button>
            <div>
                {showAddTask && (
                    <form className="add-task-form"
                    style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto'}}
                    onSubmit={handleAddTask}>
                        <label>New Task</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label>
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={(e) => setCompleted(e.target.checked)}
                            />
                        Completed</label>
                        <button type="submit">Add</button>
                        <button type="button" onClick={cancelAdd}>Cancel</button>
                    </form>)}
            </div>
            
            {taskMessage && <p>{taskMessage}</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default TaskList;
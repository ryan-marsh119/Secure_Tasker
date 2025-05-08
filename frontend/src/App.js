import logo from './logo.svg';
import Login from './Login';
import './App.css';
import TaskList from './TaskList';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

// Router:
// Routes: set of routes
// Route: define individual routes
// Navigate: redirect users

function App() {
  const token = localStorage.getItem('accessToken');
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />

        {/* Default route if user tries to access route that does not exist. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

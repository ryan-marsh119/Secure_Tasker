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
      </Routes>
    </Router>


    // <div className="App">
    //     <Login />
    //   </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

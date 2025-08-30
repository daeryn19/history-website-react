import './App.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './signup';
import Guest from './guest';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login successful!`);
  }

  return (
    <Routes>
      <Route path = "/" element = {
        <div className="App">
          <div className = "App-header">
            HISTODOCS
          </div>
          <div className = "bg">
            <div className = "box">
              <form onSubmit = {handleLogin}>
                <input
                  type = "text"
                  placeholder = "Username"
                  value = {username}
                  onChange = {(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type = "password"
                  placeholder = "Password"
                  value = {password}
                  onChange = {(e) => setPassword(e.target.value)}
                  required
                />
                <button type = "submit">Login</button>
                <button type = "button" onClick = {() => navigate('/signup')}>Signup</button>
                You can also use the platform only as <button type = "button" onClick = {() => navigate('/guest')}>Guest</button>
              </form>
            </div>
          </div>
          <div className = "App-footer">
            Contact
          </div>
        </div>
      } />
      <Route path="/signup" element={<Signup />} />
      <Route path="/guest" element={<Guest />} />
    </Routes>
  );
}

export default App;
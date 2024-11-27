import React, { useState } from 'react';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // adding logic once backend is finished.
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="form-container">
          <h2>Login</h2>
          <label>
            email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <div>{error}</div>}
          <br />
          <button onClick={handleLogin}>Log In</button>
        </div>
      );
};

export default LogIn;
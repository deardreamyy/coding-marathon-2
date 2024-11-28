import React, { useState } from 'react';
import useLogin from '../hooks/useLogIn';

const LogInPage = ({setIsAuthenticated}) => {
    const [email, setEmail, password, setPassword, error, handleLogin] = useLogin({setIsAuthenticated });

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
              <div className="space-y-4">
                  <label className="block">
                      <span className="text-gray-700">Email:</span>
                      <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </label>
                  <label className="block">
                      <span className="text-gray-700">Password:</span>
                      <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </label>
                  {error && <div className="text-red-500">{error}</div>}
                  <button
                      onClick={handleLogin}
                      className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                      Log In
                  </button>
              </div>
          </div>
      </div>
  );
};

export default LogInPage;
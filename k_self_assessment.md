### Self-Assessment

#### Example 1: Building a Reusable Login Hook and Login Page

In the beginning, me and Hilda discussed what structure we should utilize for the login and signup pages. We chose to use hook and page approach for easy readability and maintainability.

```//UseLogin.jsx
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const useLogin = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
      
            if (response.ok) {
              const user = await response.json();
              sessionStorage.setItem("user", JSON.stringify(user));
              console.log("User logged in successfully!");
              setIsAuthenticated(true);
              navigate("/");
            } else {
              console.error("Login failed");
              const { error } = await response.json();
              setError(error);
            }
          } catch (error) {
            console.error("Error during login:", error);
            setError("Error during login");
          }
    };

    return [email, setEmail, password, setPassword, error, handleLogin];
};

export default useLogin;

```

**Key Improvements:**

1. **Centralized State Management:**  
   The `useLogin` hook consolidates essential login-related state variables—`email`, `password`, and `error`—into one reusable structure. This eliminates duplication and improves code clarity.

2. **Asynchronous API Handling:**  
   The hook encapsulates the logic for communicating with the `/api/users/login` endpoint. It provides error handling and manages success (navigation and session storage) and failure cases (descriptive error messages).

3. **Improved Reusability:**  
   The hook allows the login functionality to be used in multiple components or contexts by simply importing it. This promotes consistency across the application and adheres to the DRY (Don't Repeat Yourself) principle.

4. **Extensibility:**  
   Future enhancements, such as token management or tracking login attempts, can be easily added to the hook without affecting its consumers.

```//LogInPage.jsx
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
```

**Key Improvements:**

1. **Focus on UI:**  
   The `LogInPage` component is now dedicated to rendering the user interface and managing user interactions. This separation of concerns improves maintainability and makes the component easier to understand.

2. **Error Display:**  
   The error state from the hook is directly utilized to provide immediate, user-friendly feedback, improving the login experience.

3. **Responsive Design:**  
   The component uses a visually appealing, responsive layout with a card-style form that enhances usability and accessibility.

4. **Simplified Code:**  
   By delegating logic to the `useLogin` hook, the component remains lightweight, with no duplicated or complex logic.

---

#### Lessons Learned:

1. **Modular Design:**  
   Encapsulating logic in a reusable hook simplifies the architecture, making the codebase more scalable and easier to maintain.

2. **Separation of Concerns:**  
   Dividing responsibilities between the `useLogin` hook (logic) and `LogInPage` component (UI) adheres to React best practices, ensuring clear boundaries.

3. **Error Handling Enhances UX:**  
   Providing real-time error feedback improves user experience and builds trust by offering clear, actionable information when something goes wrong.

4. **Reusability Promotes Consistency:**  
   Centralizing logic in a hook ensures uniform behavior across different parts of the application, reducing bugs and making future updates more efficient.

#### Example 2: Fixing Error Handling and Toast Notifications in Job Submission

**Problem:**  
While the initial AddJobPage worked with fake-api, we had trouble using it with our backend. 
The original implementation of the job submission had some challenges that needed to be addressed:
- Both success and error toasts were displayed regardless of the operation's outcome.
- Jobs were not being added due to missing authentication (no `Authorization` header).
- The `submitForm` function was not asynchronous, leading to improper handling of asynchronous API operations.

Original Code:  
```//AddJobPage.jsx
const addJob = async (newJob) => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    if (!res.ok) {
      throw new Error("Failed to add job");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while adding the job.");
    return false;
  }
  return true;
};

const submitForm = (e) => {
  e.preventDefault();

  const newJob = {
    title,
    type,
    location,
    description,
    salary,
    company: {
      name: companyName,
      description: companyDescription,
      contactEmail,
      contactPhone,
    },
  };

  addJob(newJob);

  toast.success("Job Added Successfully");

  return navigate("/jobs");
};
```

**Fix:**  
The issues were addressed as follows:

1. **Authorization Header:**  
   - The `addJob` function now includes an `Authorization` header with a token retrieved from `sessionStorage`.
   - This ensures authenticated API requests.

2. **Proper Await for `addJob`:**  
   - The `submitForm` function was made `async`, allowing it to await the result of `addJob`.  
   - This ensures the success toast and navigation only occur if the job was successfully added.

3. **Error Handling Logic:**  
   - The `addJob` function returns `false` on failure and `true` on success, enabling clear decision-making in `submitForm`.

Fixed Code:  
```//AddJobPage.jsx
const addJob = async (newJob) => {
  try {
    const data = JSON.parse(sessionStorage.getItem("user"));
    const token = data.token;
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newJob),
    });
    if (!res.ok) {
      throw new Error("Failed to add job");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while adding the job.");
    return false;
  }
  return true;
};

const submitForm = async (e) => {
  e.preventDefault();

  const newJob = {
    title,
    type,
    location,
    description,
    salary,
    company: {
      name: companyName,
      description: companyDescription,
      contactEmail,
      contactPhone,
    },
  };

  const success = await addJob(newJob);

  if (!success) {
    return;
  }

  toast.success("Job Added Successfully");
  return navigate("/jobs");
};
```

**Lessons Learned:**

1. **Error Handling and Clear Feedback:**  
   Explicitly returning `false` or `true` from `addJob` ensures that subsequent actions, such as displaying a toast or navigating, are conditional on the operation's success.

2. **Authentication Matters:**  
   Adding the `Authorization` header resolved the API issue, demonstrating the importance of including necessary credentials for secured endpoints.

3. **Await Asynchronous Operations:**  
   Ensuring `submitForm` is asynchronous and awaiting `addJob` prevents premature execution of subsequent logic, such as displaying success messages or navigating the user.

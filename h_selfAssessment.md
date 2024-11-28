## Self Assessment

### SignUp
At first, we discussed with Karoliina how we should approach the creation of the log in and sign up components. We decided to create custom hooks already at the beginning.

``` js
import { useSignup } from "../hooks/useSignup";
import Select from "react-select";

const SignUpPage = ({ setIsAuthenticated }) => {
  const { name, email, password, password2, setName, setEmail, setPassword, setPassword2, handleSignup, error, phone_number, setPhone_number, gender, setGender, date_of_birth, setDate_of_birth, membership_status, setMembership_status } = useSignup({ setIsAuthenticated });
    
  const genderOptions = [
      { value: 'Male', label: 'Male'},
      { value: 'Female', label: 'Female'},
      { value: 'Other', label: 'Other'}
    ];

    const handleGenderChange = (selectedOption) => {
      setGender(selectedOption.value);
    };

  const membershipStatusOptions = [
    {value: 'Yes', label: 'Yes'},
    {value: 'No', label: 'No'}
  ];

  const handleMembershipStatusChange = (selectedOption) => {
    setMembership_status(selectedOption.value);
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Signup</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
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
            <span className="text-gray-700">Phone Number:</span>
            <input
              type="text"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Gender</span>
            <Select
            value = {genderOptions.find((option) => option.value===gender)}
            onChange={handleGenderChange}
            options={genderOptions}
            placeholder= "Choose your gender"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Date of Birth:</span>
            <input
              type="date"
              value={date_of_birth}
              onChange={(e) => setDate_of_birth(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Membership Status:</span>
            <Select
            value = {membershipStatusOptions.find((option) => option.value===membership_status)}
            onChange={handleMembershipStatusChange}
            options={membershipStatusOptions}
            placeholder= "Are you a member?"
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
          <label className="block">
            <span className="text-gray-700">Confirm Password:</span>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          {error && <div className="text-red-500">{error}</div>}
          <button
            onClick={handleSignup}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
```

### I'm happy about:

1. **Modularized Logic with Custom Hook** (useSignup)
Encapsulation of logic: Leveraging a custom hook, useSignup, to manage the signup form's logic. It keeps the component code focused on the UI, while the hook encapsulates form state management, validation, and submission logic. By separating the logic for handling the signup process (form validation, password matching, API calls, etc.) into the hook, the component itself becomes more concise, readable, and easier to maintain.
2. **State Management**
Controlled components: All form inputs are controlled components, meaning their state is linked to React’s state (useState) and updates the UI accordingly. This ensures that form data is always in sync with the component's state and provides more flexibility for handling dynamic changes in the form.
Managing various form fields (name, email, phone number, password, etc.) through separate state variables. This makes it clear and easy to update the state as needed.

### What could be improved:

The time was limited, and there are many areas that could be improved. Here are a couple of things that would be on my to-do list.

1. **Form Validation**: It would be helpful to add more comprehensive validation, either client-side or through the useSignup hook, to ensure the form data is correct before submitting. For example, checking that the passwords match, ensuring the email format is valid, and ensuring that all required fields are filled out.

2. **Submit Button Disabled State**: The "Sign Up" button could be disabled when the form is submitting or when there are validation errors. This would prevent multiple submissions and improve the user experience by making it clear that the form is in the process of submission.

3. **Password Strength Validation**: It might be beneficial to add some kind of password strength validation and display a message to the user about password requirements (e.g., minimum length, special characters).

4. **Loading State**: When the user submits the form, it would be helpful to show a loading spinner or change the button text to indicate that the submission is in progress.


### Sign Up Hook

``` js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignup = ({ setIsAuthenticated }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [phone_number, setPhone_number] = useState("");
    const [gender, setGender] = useState("");
    const [date_of_birth, setDate_of_birth] = useState("");
    const [membership_status, setMembership_status] = useState("");
    const navigate = useNavigate();
    
    const handleSignup = async () => {

        if (password !== password2) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone_number,
                    gender,
                    date_of_birth,
                    membership_status}),
            });

            if (response.ok) {
                const user = await response.json();
                sessionStorage.setItem("user", JSON.stringify(user));
                console.log("User signed up successfully!");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                console.error("Signup failed");
                const { error } = await response.json();
                setError(error);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setError("Error during signup");
        }
    };

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        password2,
        setPassword,
        setPassword2,
        handleSignup,
        error,
        phone_number,
        setPhone_number,
        gender,
        setGender,
        date_of_birth,
        setDate_of_birth,
        membership_status,
        setMembership_status
    }

}
```
The hook took some time to create. The amount of state variables and setters caused a little headache.

### What could be improved:

1. Form Validation: Centralize and expand validation to ensure data integrity (e.g., email format, password strength).
2. Error Handling: Enhance error messages with specific feedback for server and network issues.
3. Security: Avoid storing sensitive data in sessionStorage; use tokens or secure cookies.


### App

Added authentication functionality to App to ensure that certain features or routes are accessible only to authenticated users. Added necessary routes.

```js
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage"; 
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem("isAuthenticated")) || false
  );

  const setAuthState = (authState) => {
    sessionStorage.setItem("isAuthenticated", JSON.stringify(authState));
    setIsAuthenticated(authState);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/signup" element={ !isAuthenticated ? ( <SignUpPage setIsAuthenticated={setAuthState}/>) : (<Navigate to = '/' />)} />
        <Route path="/login" element={!isAuthenticated ? ( <LogInPage setIsAuthenticated={setAuthState} />) : (<Navigate to = '/' />)} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
```
### What I'm happy about:

1. Authentication Management:
State Persistence: The use of sessionStorage ensures that the user remains logged in even after page reloads, enhancing the user experience.
Centralized Authentication Logic: The setAuthState function encapsulates the logic for managing authentication state in one place, reducing code duplication and improving maintainability.

2. Conditional Routing:
Guarding Routes: The conditional routing prevents authenticated users from accidentally navigating to login or signup pages, streamlining the user flow.
Clear Redirects: Redirecting users to the homepage if they are already authenticated is a good practice for avoiding unnecessary actions like re-signing up or logging in.

### What could be improved:

1. User Logout Functionality:
 Current Limitation: The code currently does not handle the logout process, leaving users authenticated until they close their browser or reload the page.
2. Enhance Security: Use more secure storage methods for tokens.


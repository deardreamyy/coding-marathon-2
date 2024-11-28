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
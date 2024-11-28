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
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
    } 

    return [email, setEmail, password, setPassword, error, handleLogin];
}

export default useLogin;
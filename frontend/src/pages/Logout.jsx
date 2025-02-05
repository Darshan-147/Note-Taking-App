import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Clear authentication token
    navigate("/"); // Redirect to login page
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-xl font-bold text-gray-700">Logging out...</h2>
    </div>
  );
};

export default Logout;

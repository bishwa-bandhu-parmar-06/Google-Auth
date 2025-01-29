import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../components/styles/dashboard.css'; // Import the custom CSS for additional styling

const backenduri = import.meta.env.VITE_BACKEND_URI;

const DashBoard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const getUser = async () => {
            try {
                const apiResponse = await fetch(`${backenduri}/api/auth/get-user`, {
                    method: 'GET',
                    credentials: 'include', 
                });

                if (!apiResponse.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const responseData = await apiResponse.json();

                if (!responseData.success) {
                    throw new Error(responseData.message || "User fetch failed");
                }

                setUserData(responseData.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const logout = async () => {
        try {
            toast.info('Logging out...');

            const apiResponse = await fetch(`${backenduri}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!apiResponse.ok) {
                throw new Error("Failed to logout");
            }

            navigate('/');
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{`Error: ${error}`}</div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            
            <div className="user-info">
                <img 
                    src={userData?.avatar} 
                    alt={userData?.name} 
                    className="avatar"
                />
                <h2 className="user-name">{userData?.name}</h2>
                <p className="user-email">Email: {userData?.email}</p>
                <p className="user-phone">Mobile No.: {userData?.phoneNumber || "N/A"}</p>
            </div>

            <div className="logout-btn-container">
                <button 
                    onClick={logout} 
                    className="logout-btn"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashBoard;

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Login from "../pages/Login";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import UserDashboard from "../pages/UserDashboard";
import Header from "../components/Header";

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const isUser = localStorage.getItem("currentUser"); // Check auth state
    return isUser ? <>{children}</> : <Navigate to="/login" replace />;
};

// Layout Wrapper: Conditionally Render Header
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation(); // Get current route
    const showHeader = location.pathname !== "/login"; // Hide header on login page

    return (
        <>
            {showHeader && <Header />}
            {children}
        </>
    );
};

const AppRoutes: React.FC = () => {
    const isUser = localStorage.getItem("currentUser"); // Check if user is logged in

    return (
        <Router>
            <Routes>
                {/* Public Route: Login */}
                <Route
                    path="/login"
                    element={
                        isUser ? (
                            <Navigate to="/user-management" replace />
                        ) : (
                            <Login />
                        )
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AnalyticsDashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AnalyticsDashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-management"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <UserDashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Optional: Fallback Route for 404 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

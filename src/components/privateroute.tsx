import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "./authcontext";

interface ProtectedRouteProps {
    children: JSX.Element;
    roles?: string[]; 
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const { user, isLoading } = useContext(UserAuthContext) ?? {};

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!user) {
        return <Navigate to="/auth" />;
    }

    if (roles && roles.length > 0 && !roles.some(role => user?.labels?.includes(role))) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;

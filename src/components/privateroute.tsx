import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "./authcontext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, isLoading } = useContext(UserAuthContext) ?? {};

    if (isLoading) {
        return <div>Loading...</div>; // or any loading indicator
    }

    return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

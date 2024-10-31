import React, { useContext } from 'react';
import { UserAuthContext } from '../components/authcontext';
import Spinner from '../components/loading';

const ProfilePage: React.FC = () => {
    const context = useContext(UserAuthContext);
    const { user } = context!;

    if (!user) {
        return <Spinner />;
    }

    return (
        <div className="flex grow bg-gray-100 dark:bg-gray-900 p-5 justify-center align-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">My Profile</h1>
                
                <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-200">Name: {user.name}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-200">Email: {user.email}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-200">Phone: {user.phone || "-"}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-200">Registration Date: {new Date(user.registration).toLocaleDateString()}</p>
                </div>
                <div className="mb-4">
                    <p className={`text-gray-900 dark:text-gray-200 ${user.status ? 'text-green-500' : 'text-red-500'}`}>
                        Status: {user.status ? 'Enabled' : 'Disabled'}
                    </p>
                </div>
                <div className="mb-4">
                    <p className={`text-gray-900 dark:text-gray-200 ${user.emailVerification ? 'text-green-500' : 'text-red-500'}`}>
                        Email Verified: {user.emailVerification ? 'Yes' : 'No'}
                    </p>
                </div>
                <div className="mb-4">
                    <p className={`text-gray-900 dark:text-gray-200 ${user.phoneVerification ? 'text-green-500' : 'text-red-500'}`}>
                        Phone Verified: {user.phoneVerification ? 'Yes' : 'No'}
                    </p>
                </div>
                <div className="mb-4">
                    <p className={`text-gray-900 dark:text-gray-200 ${user.mfa ? 'text-green-500' : 'text-red-500'}`}>
                        MFA Enabled: {user.mfa ? 'Yes' : 'No'}
                    </p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-200">Labels: {user.labels.join(', ')}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-200">Last Accessed: {new Date(user.accessedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>);
};

export default ProfilePage;

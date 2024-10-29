import React, { useEffect, useState } from 'react';
import { User } from '../../utils/types'; // Assuming you have a User type defined
import { GetUsers, ID } from '../../utils/appwriteConfig'; // Assuming you have a GetUsers function

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users per page

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await GetUsers(1, 100); // Fetch a larger set for pagination
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="grow px-4 py-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Admin Users</h1>

            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr className="border-b dark:border-gray-700">
                        <th className="p-4 text-center">ID</th>
                        <th className="p-4 text-center">Name</th>
                        <th className="p-4 text-center">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={ID.unique()} className="border-b dark:border-gray-700 text-center">
                            <td className="p-4">{user.id}</td>
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminUsersPage;
